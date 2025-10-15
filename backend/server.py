from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET', 'posyandu-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class JenisLayanan(str, Enum):
    IMUNISASI = "Imunisasi"
    PENIMBANGAN = "Penimbangan"
    KONSELING = "Konseling Gizi"
    PEMERIKSAAN_IBU = "Pemeriksaan Ibu Hamil"
    VITAMIN = "Pemberian Vitamin"

class JenisKelamin(str, Enum):
    LAKI_LAKI = "Laki-laki"
    PEREMPUAN = "Perempuan"

class StatusJadwal(str, Enum):
    AKTIF = "Aktif"
    SELESAI = "Selesai"
    DIBATALKAN = "Dibatalkan"

# Models
class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    nama: str
    role: str = "kader"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminCreate(BaseModel):
    username: str
    password: str
    nama: str

class AdminLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: Admin

class Jadwal(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tanggal: str  # Format: YYYY-MM-DD
    waktu: str    # Format: HH:MM-HH:MM
    lokasi: str
    jenis_layanan: JenisLayanan
    keterangan: Optional[str] = ""
    status: StatusJadwal = StatusJadwal.AKTIF
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JadwalCreate(BaseModel):
    tanggal: str
    waktu: str
    lokasi: str
    jenis_layanan: JenisLayanan
    keterangan: Optional[str] = ""

class JadwalUpdate(BaseModel):
    tanggal: Optional[str] = None
    waktu: Optional[str] = None
    lokasi: Optional[str] = None
    jenis_layanan: Optional[JenisLayanan] = None
    keterangan: Optional[str] = None
    status: Optional[StatusJadwal] = None

class Peserta(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nama: str
    nik: str
    alamat: str
    no_hp: str
    jenis_kelamin: JenisKelamin
    tanggal_lahir: str  # Format: YYYY-MM-DD
    jadwal_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PesertaCreate(BaseModel):
    nama: str
    nik: str
    alamat: str
    no_hp: str
    jenis_kelamin: JenisKelamin
    tanggal_lahir: str
    jadwal_id: Optional[str] = None

class PesertaUpdate(BaseModel):
    nama: Optional[str] = None
    nik: Optional[str] = None
    alamat: Optional[str] = None
    no_hp: Optional[str] = None
    jenis_kelamin: Optional[JenisKelamin] = None
    tanggal_lahir: Optional[str] = None
    jadwal_id: Optional[str] = None

class Statistik(BaseModel):
    total_jadwal: int
    jadwal_aktif: int
    total_peserta: int
    peserta_by_layanan: List[dict]
    peserta_by_gender: List[dict]

# Helper Functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin(username: str = Depends(verify_token)):
    admin = await db.admins.find_one({"username": username}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return Admin(**admin)

# Auth Routes
@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: AdminLogin):
    admin_doc = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    
    if not admin_doc:
        raise HTTPException(status_code=401, detail="Username atau password salah")
    
    stored_password = admin_doc.get("password", "")
    if not pwd_context.verify(credentials.password, stored_password):
        raise HTTPException(status_code=401, detail="Username atau password salah")
    
    # Remove password from response
    admin_doc.pop("password", None)
    admin = Admin(**admin_doc)
    
    access_token = create_access_token(data={"sub": admin.username})
    
    return TokenResponse(
        access_token=access_token,
        admin=admin
    )

@api_router.get("/auth/me", response_model=Admin)
async def get_current_user(admin: Admin = Depends(get_current_admin)):
    return admin

# Jadwal Routes
@api_router.get("/jadwal", response_model=List[Jadwal])
async def get_jadwal(
    tanggal: Optional[str] = None,
    lokasi: Optional[str] = None,
    jenis_layanan: Optional[str] = None,
    status: Optional[str] = None
):
    query = {}
    if tanggal:
        query["tanggal"] = tanggal
    if lokasi:
        query["lokasi"] = {"$regex": lokasi, "$options": "i"}
    if jenis_layanan:
        query["jenis_layanan"] = jenis_layanan
    if status:
        query["status"] = status
    else:
        # Default: only show active schedules for public
        query["status"] = StatusJadwal.AKTIF
    
    jadwal_list = await db.jadwal.find(query, {"_id": 0}).sort("tanggal", 1).to_list(1000)
    
    for jadwal in jadwal_list:
        if isinstance(jadwal.get('created_at'), str):
            jadwal['created_at'] = datetime.fromisoformat(jadwal['created_at'])
        if isinstance(jadwal.get('updated_at'), str):
            jadwal['updated_at'] = datetime.fromisoformat(jadwal['updated_at'])
    
    return jadwal_list

@api_router.post("/jadwal", response_model=Jadwal)
async def create_jadwal(jadwal_input: JadwalCreate, admin: Admin = Depends(get_current_admin)):
    jadwal_obj = Jadwal(**jadwal_input.model_dump())
    
    doc = jadwal_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.jadwal.insert_one(doc)
    return jadwal_obj

@api_router.put("/jadwal/{jadwal_id}", response_model=Jadwal)
async def update_jadwal(
    jadwal_id: str,
    jadwal_update: JadwalUpdate,
    admin: Admin = Depends(get_current_admin)
):
    existing = await db.jadwal.find_one({"id": jadwal_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Jadwal tidak ditemukan")
    
    update_data = jadwal_update.model_dump(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
        await db.jadwal.update_one({"id": jadwal_id}, {"$set": update_data})
    
    updated = await db.jadwal.find_one({"id": jadwal_id}, {"_id": 0})
    
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    
    return Jadwal(**updated)

@api_router.delete("/jadwal/{jadwal_id}")
async def delete_jadwal(jadwal_id: str, admin: Admin = Depends(get_current_admin)):
    result = await db.jadwal.delete_one({"id": jadwal_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Jadwal tidak ditemukan")
    return {"message": "Jadwal berhasil dihapus"}

# Peserta Routes
@api_router.get("/peserta", response_model=List[Peserta])
async def get_peserta(
    nama: Optional[str] = None,
    jadwal_id: Optional[str] = None,
    admin: Admin = Depends(get_current_admin)
):
    query = {}
    if nama:
        query["nama"] = {"$regex": nama, "$options": "i"}
    if jadwal_id:
        query["jadwal_id"] = jadwal_id
    
    peserta_list = await db.peserta.find(query, {"_id": 0}).sort("nama", 1).to_list(1000)
    
    for peserta in peserta_list:
        if isinstance(peserta.get('created_at'), str):
            peserta['created_at'] = datetime.fromisoformat(peserta['created_at'])
        if isinstance(peserta.get('updated_at'), str):
            peserta['updated_at'] = datetime.fromisoformat(peserta['updated_at'])
    
    return peserta_list

@api_router.post("/peserta", response_model=Peserta)
async def create_peserta(peserta_input: PesertaCreate, admin: Admin = Depends(get_current_admin)):
    peserta_obj = Peserta(**peserta_input.model_dump())
    
    doc = peserta_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.peserta.insert_one(doc)
    return peserta_obj

@api_router.put("/peserta/{peserta_id}", response_model=Peserta)
async def update_peserta(
    peserta_id: str,
    peserta_update: PesertaUpdate,
    admin: Admin = Depends(get_current_admin)
):
    existing = await db.peserta.find_one({"id": peserta_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Peserta tidak ditemukan")
    
    update_data = peserta_update.model_dump(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
        await db.peserta.update_one({"id": peserta_id}, {"$set": update_data})
    
    updated = await db.peserta.find_one({"id": peserta_id}, {"_id": 0})
    
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    
    return Peserta(**updated)

@api_router.delete("/peserta/{peserta_id}")
async def delete_peserta(peserta_id: str, admin: Admin = Depends(get_current_admin)):
    result = await db.peserta.delete_one({"id": peserta_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Peserta tidak ditemukan")
    return {"message": "Peserta berhasil dihapus"}

# Laporan Routes
@api_router.get("/laporan/statistik", response_model=Statistik)
async def get_statistik(admin: Admin = Depends(get_current_admin)):
    # Total jadwal
    total_jadwal = await db.jadwal.count_documents({})
    jadwal_aktif = await db.jadwal.count_documents({"status": StatusJadwal.AKTIF})
    
    # Total peserta
    total_peserta = await db.peserta.count_documents({})
    
    # Peserta by layanan
    pipeline_layanan = [
        {
            "$lookup": {
                "from": "jadwal",
                "localField": "jadwal_id",
                "foreignField": "id",
                "as": "jadwal_info"
            }
        },
        {"$unwind": {"path": "$jadwal_info", "preserveNullAndEmptyArrays": True}},
        {
            "$group": {
                "_id": "$jadwal_info.jenis_layanan",
                "count": {"$sum": 1}
            }
        }
    ]
    
    peserta_by_layanan_cursor = db.peserta.aggregate(pipeline_layanan)
    peserta_by_layanan = []
    async for doc in peserta_by_layanan_cursor:
        peserta_by_layanan.append({
            "name": doc["_id"] or "Belum Terdaftar",
            "value": doc["count"]
        })
    
    # Peserta by gender
    pipeline_gender = [
        {
            "$group": {
                "_id": "$jenis_kelamin",
                "count": {"$sum": 1}
            }
        }
    ]
    
    peserta_by_gender_cursor = db.peserta.aggregate(pipeline_gender)
    peserta_by_gender = []
    async for doc in peserta_by_gender_cursor:
        peserta_by_gender.append({
            "name": doc["_id"],
            "value": doc["count"]
        })
    
    return Statistik(
        total_jadwal=total_jadwal,
        jadwal_aktif=jadwal_aktif,
        total_peserta=total_peserta,
        peserta_by_layanan=peserta_by_layanan,
        peserta_by_gender=peserta_by_gender
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    # Create default admin if not exists
    existing_admin = await db.admins.find_one({"username": "admin"})
    if not existing_admin:
        default_admin = AdminCreate(
            username="admin",
            password="admin123",
            nama="Administrator"
        )
        admin_obj = Admin(**default_admin.model_dump(exclude={"password"}))
        doc = admin_obj.model_dump()
        doc["password"] = pwd_context.hash(default_admin.password)
        doc['created_at'] = doc['created_at'].isoformat()
        await db.admins.insert_one(doc)
        logger.info("Default admin created: username=admin, password=admin123")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

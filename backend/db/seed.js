const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'tradao.db'));

// Drop and recreate to ensure clean schema
db.exec(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS sections;
  DROP TABLE IF EXISTS groups;

  CREATE TABLE groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0
  );
  CREATE TABLE sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    group_id INTEGER,
    sort_order INTEGER DEFAULT 0
  );
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    section_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Tables already clean from DROP above

// --- Unsplash tea images ---
const U = id => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`;
const IMG = {
  // teapots
  tp1: U('1544787219-7f47ccb76574'), tp2: U('1571934811356-5cc061b6821f'),
  tp3: U('1556742400-b5b7b99e7a0f'), tp4: U('1603031823718-6d3eb2c60413'),
  tp5: U('1564890369478-c89ca6d9cde9'), tp6: U('1576092762791-5985bd2b0c30'),
  tp7: U('1594631252845-29fc4cc8cdd8'), tp8: U('1558618666-fcd25c85cd64'),
  tp9: U('1556744501-4a5a3beaec7c'), tp10:U('1611073615830-c9addb78ea89'),
  // tea sets
  ts1: U('1563822249366-3efb23b8e0c9'), ts2: U('1510707577719-ae7c14805e3a'),
  ts3: U('1606222026551-5e16c07a28d7'), ts4: U('1597318181409-cf64d0b5d8a2'),
  ts5: U('1556742049-0cfed4f6a45d'),   ts6: U('1504545102780-26b9453aa4b4'),
  ts7: U('1548340748-6be3f0a10d5c'),   ts8: U('1509042239860-f519ffa06b78'),
  // cups
  cp1: U('1544027949-6b6010f1ddec'),   cp2: U('1549619856-f6f6bce9e36e'),
  cp3: U('1540189084-0d1e37a76384'),   cp4: U('1558618666-fcd25c85cd64'),
  cp5: U('1576092762791-5985bd2b0c30'),
  // trays / tools
  tr1: U('1510707577719-ae7c14805e3a'), tr2: U('1548340748-6be3f0a10d5c'),
  tr3: U('1556045011-7efac3bc44ec'),   tr4: U('1540189084-0d1e37a76384'),
  tr5: U('1509042239860-f519ffa06b78'),
};

// ── Groups ──────────────────────────────────────────────────
const gStmt = db.prepare('INSERT INTO groups (name, slug, sort_order) VALUES (?, ?, ?)');
gStmt.run('Ấm Tử Sa Cao Cấp',          'am-tu-sa',     1);
gStmt.run('Bộ Ấm Trà & Phụ Kiện',      'bo-am-tra',    2);
gStmt.run('Dụng Cụ Chuyên Nghiệp',      'dung-cu',      3);

// ── Sections ─────────────────────────────────────────────────
const sStmt = db.prepare('INSERT INTO sections (name, slug, group_id, sort_order) VALUES (?, ?, ?, ?)');

// Group 1 – Ấm Tử Sa (7 kiểu dáng)
const SEC = {};
[[1,'Thạch Biều','thach-bieu'],[2,'Tây Thi','tay-thi'],[3,'Thủy Bình','thuy-binh'],
 [4,'Tiếu Anh','tieu-anh'],[5,'Báo Xuân','bao-xuan'],[6,'Phỏng Cổ','phong-co'],
 [7,'Tứ Phương','tu-phuong']].forEach(([ord,name,slug])=>{
  const r = sStmt.run(name, slug, 1, ord);
  SEC[slug] = r.lastInsertRowid;
});

// Group 2 – Bộ Ấm Trà & Phụ Kiện (8 loại)
[['bo-am-qua-tang','Bộ Ấm Trà Quà Tặng',1],['bo-am-du-lich','Bộ Ấm Trà Du Lịch',2],
 ['chen-uong-tra','Chén Uống Trà',3],['khay-tra','Khay Trà',4],
 ['bo-chen-khai','Bộ Chén Khải',5],['chen-thien-muc','Chén Thiên Mục',6],
 ['phu-kien-tra','Phụ Kiện Trà Đạo',7],['trang-tri-ban-tra','Trang Trí Bàn Trà',8]
].forEach(([slug,name,ord])=>{
  const r = sStmt.run(name, slug, 2, ord);
  SEC[slug] = r.lastInsertRowid;
});

// Group 3 – Dụng Cụ Chuyên Nghiệp (8 loại)
[['dung-cu-pha-tra','Dụng Cụ Pha Trà',1],['hu-dung-tra','Hũ Đựng Trà',2],
 ['tong-tra','Tống Trà',3],['bep-dun-nuoc','Bếp Đun Nước Pha Trà',4],
 ['cung-nhan-tra','Cung Nhãn Trà',5],['mieng-lot-chen','Miếng Lót Chén Trà',6],
 ['coc-uong-tra','Cốc Uống Trà',7],['thuyen-tra','Thuyền Trà',8]
].forEach(([slug,name,ord])=>{
  const r = sStmt.run(name, slug, 3, ord);
  SEC[slug] = r.lastInsertRowid;
});

// ── Products ──────────────────────────────────────────────────
const pStmt = db.prepare(
  'INSERT INTO products (name, section_id, price, original_price, image_url) VALUES (?,?,?,?,?)'
);

const rows = [
  // ── Thạch Biều
  ['Ấm Tử Sa Thạch Biều Đỏ 150ml',        SEC['thach-bieu'], 385000, 450000, IMG.tp1],
  ['Ấm Tử Sa Thạch Biều Tím 200ml',        SEC['thach-bieu'], 465000, 550000, IMG.tp2],
  ['Ấm Tử Sa Thạch Biều Nâu 180ml',        SEC['thach-bieu'], 295000, 350000, IMG.tp3],
  ['Ấm Tử Sa Thạch Biều Cao Cấp 250ml',    SEC['thach-bieu'], 780000, 920000, IMG.tp4],
  ['Ấm Tử Sa Thạch Biều Mini 100ml',       SEC['thach-bieu'], 185000, 220000, IMG.tp5],

  // ── Tây Thi
  ['Ấm Tử Sa Tây Thi Đỏ Đào 200ml',        SEC['tay-thi'], 520000, 620000, IMG.tp2],
  ['Ấm Tử Sa Tây Thi Đất Vàng 180ml',      SEC['tay-thi'], 435000, 520000, IMG.tp6],
  ['Ấm Tử Sa Tây Thi Tím Nhạt 220ml',      SEC['tay-thi'], 650000, 780000, IMG.tp7],
  ['Ấm Tử Sa Tây Thi Nâu Đen 150ml',       SEC['tay-thi'], 320000, 380000, IMG.tp8],
  ['Ấm Tử Sa Tây Thi Chính Hãng 250ml',    SEC['tay-thi'], 960000,1150000, IMG.tp1],

  // ── Thủy Bình
  ['Ấm Tử Sa Thủy Bình Truyền Thống 200ml',SEC['thuy-binh'], 365000, 440000, IMG.tp3],
  ['Ấm Tử Sa Thủy Bình Cao Cấp 300ml',     SEC['thuy-binh'], 680000, 815000, IMG.tp4],
  ['Ấm Tử Sa Thủy Bình Mini 120ml',        SEC['thuy-binh'], 225000, 270000, IMG.tp5],
  ['Ấm Tử Sa Thủy Bình Khắc Hoa 180ml',   SEC['thuy-binh'], 485000, 580000, IMG.tp6],
  ['Ấm Tử Sa Thủy Bình Đỏ Sen 250ml',      SEC['thuy-binh'], 560000, 670000, IMG.tp7],

  // ── Tiếu Anh
  ['Ấm Tử Sa Tiếu Anh Nâu Đỏ 180ml',      SEC['tieu-anh'], 420000, 500000, IMG.tp8],
  ['Ấm Tử Sa Tiếu Anh Vàng Trà 200ml',     SEC['tieu-anh'], 335000, 400000, IMG.tp9],
  ['Ấm Tử Sa Tiếu Anh Tím Hoa 150ml',      SEC['tieu-anh'], 585000, 700000, IMG.tp10],
  ['Ấm Tử Sa Tiếu Anh Cao Cấp 250ml',      SEC['tieu-anh'], 780000, 935000, IMG.tp1],
  ['Ấm Tử Sa Tiếu Anh Nhỏ 100ml',          SEC['tieu-anh'], 195000, 235000, IMG.tp2],

  // ── Báo Xuân
  ['Ấm Tử Sa Báo Xuân Đỏ Xuân 200ml',      SEC['bao-xuan'], 450000, 540000, IMG.tp3],
  ['Ấm Tử Sa Báo Xuân Hoa Đào 180ml',      SEC['bao-xuan'], 365000, 440000, IMG.tp4],
  ['Ấm Tử Sa Báo Xuân Tím Quý 220ml',      SEC['bao-xuan'], 625000, 750000, IMG.tp5],
  ['Ấm Tử Sa Báo Xuân Mini 120ml',         SEC['bao-xuan'], 215000, 260000, IMG.tp6],
  ['Ấm Tử Sa Báo Xuân Cao Cấp 300ml',      SEC['bao-xuan'], 895000,1075000, IMG.tp7],

  // ── Phỏng Cổ
  ['Ấm Tử Sa Phỏng Cổ Cổ Điển 200ml',     SEC['phong-co'], 495000, 595000, IMG.tp8],
  ['Ấm Tử Sa Phỏng Cổ Đất Nâu 180ml',     SEC['phong-co'], 385000, 460000, IMG.tp9],
  ['Ấm Tử Sa Phỏng Cổ Khắc Long 250ml',   SEC['phong-co'], 865000,1040000, IMG.tp10],
  ['Ấm Tử Sa Phỏng Cổ Tím Đen 150ml',     SEC['phong-co'], 295000, 355000, IMG.tp1],
  ['Ấm Tử Sa Phỏng Cổ Nhỏ 100ml',         SEC['phong-co'], 165000, 200000, IMG.tp2],

  // ── Tứ Phương
  ['Ấm Tử Sa Tứ Phương Vuông 200ml',       SEC['tu-phuong'], 545000, 655000, IMG.tp3],
  ['Ấm Tử Sa Tứ Phương Khắc Tùng 180ml',  SEC['tu-phuong'], 685000, 820000, IMG.tp4],
  ['Ấm Tử Sa Tứ Phương Nâu Đỏ 250ml',     SEC['tu-phuong'], 435000, 520000, IMG.tp5],
  ['Ấm Tử Sa Tứ Phương Mini 120ml',        SEC['tu-phuong'], 245000, 295000, IMG.tp6],
  ['Ấm Tử Sa Tứ Phương Cao Cấp 300ml',    SEC['tu-phuong'],1080000,1300000, IMG.tp7],

  // ── Bộ ấm trà quà tặng
  ['Bộ Ấm Trà Tử Sa Quà Tặng Cao Cấp',   SEC['bo-am-qua-tang'], 685000, 820000, IMG.ts1],
  ['Bộ Ấm Trà Sứ Hộp Gỗ Sang Trọng',     SEC['bo-am-qua-tang'], 545000, 650000, IMG.ts2],
  ['Bộ Ấm Trà Celadon Hộp Quà 6 Món',    SEC['bo-am-qua-tang'], 925000,1100000, IMG.ts3],
  ['Bộ Ấm Trà Đất Nung Quà Tặng 8 Món',  SEC['bo-am-qua-tang'],1250000,1500000, IMG.ts4],
  ['Bộ Ấm Trà Mini Hộp Quà Du Xuân',     SEC['bo-am-qua-tang'], 385000, 460000, IMG.ts5],

  // ── Bộ ấm trà du lịch
  ['Bộ Ấm Trà Du Lịch Túi Vải 6 Món',    SEC['bo-am-du-lich'], 325000, 390000, IMG.ts6],
  ['Bộ Ấm Trà Du Lịch Hộp Nhôm Cao Cấp', SEC['bo-am-du-lich'], 485000, 580000, IMG.ts7],
  ['Bộ Ấm Trà Du Lịch Inox Chống Vỡ',    SEC['bo-am-du-lich'], 265000, 320000, IMG.ts8],
  ['Bộ Ấm Trà Du Lịch Tử Sa Mini',       SEC['bo-am-du-lich'], 625000, 750000, IMG.ts1],
  ['Bộ Ấm Trà Du Lịch Thủy Tinh 4 Món',  SEC['bo-am-du-lich'], 195000, 235000, IMG.ts2],

  // ── Chén uống trà
  ['Chén Tử Sa Nhỏ Tinh Tế 30ml',         SEC['chen-uong-tra'],  85000, 100000, IMG.cp1],
  ['Chén Sứ Trắng Vẽ Tay 50ml',           SEC['chen-uong-tra'],  65000,  80000, IMG.cp2],
  ['Chén Gốm Men Ngọc 40ml',              SEC['chen-uong-tra'], 120000, 145000, IMG.cp3],
  ['Chén Celadon Cao Cấp Set 6',          SEC['chen-uong-tra'], 285000, 340000, IMG.cp4],
  ['Chén Đất Nung Truyền Thống 45ml',     SEC['chen-uong-tra'],  95000, 115000, IMG.cp5],

  // ── Khay trà
  ['Khay Trà Gỗ Tự Nhiên 40x25cm',        SEC['khay-tra'], 365000, 440000, IMG.tr1],
  ['Khay Trà Tre Cao Cấp 50x30cm',         SEC['khay-tra'], 245000, 295000, IMG.tr2],
  ['Khay Trà Đá Tự Nhiên Cao Cấp',        SEC['khay-tra'], 785000, 940000, IMG.tr3],
  ['Thuyền Trà Gỗ Gụ Chạm Khắc',         SEC['khay-tra'], 650000, 780000, IMG.tr4],
  ['Khay Trà Inox 304 Chống Gỉ',          SEC['khay-tra'], 185000, 225000, IMG.tr5],

  // ── Bộ chén khải
  ['Bộ Chén Khải Tử Sa 6 Cái',            SEC['bo-chen-khai'], 485000, 580000, IMG.cp1],
  ['Bộ Chén Khải Sứ Trắng 8 Cái',         SEC['bo-chen-khai'], 325000, 390000, IMG.cp2],
  ['Bộ Chén Khải Gốm Men Ngọc 4 Cái',    SEC['bo-chen-khai'], 565000, 680000, IMG.cp3],
  ['Bộ Chén Khải Cao Cấp Nhật Bản',       SEC['bo-chen-khai'], 865000,1040000, IMG.cp4],
  ['Bộ Chén Khải Đất Nung 6 Cái',         SEC['bo-chen-khai'], 245000, 295000, IMG.cp5],

  // ── Chén thiên mục
  ['Chén Thiên Mục Vân Đá Cao Cấp',       SEC['chen-thien-muc'], 145000, 175000, IMG.cp1],
  ['Chén Thiên Mục Men Chảy Đặc Biệt',    SEC['chen-thien-muc'], 225000, 270000, IMG.cp2],
  ['Chén Thiên Mục Hoa Văn Truyền Thống', SEC['chen-thien-muc'],  95000, 115000, IMG.cp3],
  ['Chén Thiên Mục Tống Nhỏ 30ml',        SEC['chen-thien-muc'],  75000,  90000, IMG.cp4],
  ['Chén Thiên Mục Nghệ Nhân Thủ Công',   SEC['chen-thien-muc'], 385000, 460000, IMG.cp5],

  // ── Phụ kiện trà đạo
  ['Bộ Dụng Cụ Trà Đạo Tre 7 Món',       SEC['phu-kien-tra'], 185000, 220000, IMG.tr1],
  ['Kẹp Trà Gỗ Ebony Cao Cấp',            SEC['phu-kien-tra'],  95000, 115000, IMG.tr2],
  ['Dao Xẻ Trà Bánh Phổ Nhĩ Inox',        SEC['phu-kien-tra'], 125000, 150000, IMG.tr3],
  ['Muỗng Múc Trà Sứ Vẽ Tay',            SEC['phu-kien-tra'],  75000,  90000, IMG.tr4],
  ['Lọc Trà Inox Siêu Mịn',               SEC['phu-kien-tra'], 145000, 175000, IMG.tr5],

  // ── Trang trí bàn trà
  ['Tượng Trà Thần Thiền Tông Cao 15cm',  SEC['trang-tri-ban-tra'], 365000, 440000, IMG.ts3],
  ['Tượng Bồ Đề Đạt Ma Gốm Sứ',         SEC['trang-tri-ban-tra'], 485000, 580000, IMG.ts4],
  ['Tranh Thư Pháp Trà Đạo 40x60cm',     SEC['trang-tri-ban-tra'], 285000, 340000, IMG.ts5],
  ['Tượng Lợn Tử Sa May Mắn',            SEC['trang-tri-ban-tra'], 195000, 235000, IMG.ts6],
  ['Khắc Gỗ Cảnh Trà Đạo 30x40cm',       SEC['trang-tri-ban-tra'], 545000, 655000, IMG.ts7],

  // ── Dụng cụ pha trà
  ['Bộ Dụng Cụ Pha Trà Gỗ Gụ 9 Món',    SEC['dung-cu-pha-tra'], 485000, 580000, IMG.tr1],
  ['Que Khuấy Trà Bạc 925',               SEC['dung-cu-pha-tra'], 285000, 340000, IMG.tr2],
  ['Bình Lọc Trà Thủy Tinh 500ml',        SEC['dung-cu-pha-tra'], 245000, 295000, IMG.tr3],
  ['Máy Đánh Matcha Điện Mini',            SEC['dung-cu-pha-tra'], 385000, 460000, IMG.tr4],
  ['Khăn Lau Ấm Trà Thấm Hút',           SEC['dung-cu-pha-tra'],  65000,  80000, IMG.tr5],

  // ── Hũ đựng trà
  ['Hũ Trà Gốm Sứ Men Ngọc 200g',        SEC['hu-dung-tra'], 285000, 340000, IMG.ts1],
  ['Hũ Trà Thiếc Nguyên Khối 300g',       SEC['hu-dung-tra'], 485000, 580000, IMG.ts2],
  ['Hũ Trà Tử Sa Khắc Hoa 100g',          SEC['hu-dung-tra'], 365000, 440000, IMG.ts3],
  ['Hộp Trà Gỗ Mahogany 4 Ngăn',          SEC['hu-dung-tra'], 645000, 775000, IMG.ts4],
  ['Hũ Trà Tre Thủ Công 250g',            SEC['hu-dung-tra'], 165000, 200000, IMG.ts5],

  // ── Tống trà
  ['Tống Trà Thủy Tinh Borosilicate 400ml',SEC['tong-tra'], 145000, 175000, IMG.cp1],
  ['Tống Trà Sứ Trắng Vẽ Tay 350ml',      SEC['tong-tra'], 195000, 235000, IMG.cp2],
  ['Tống Trà Tử Sa Nhỏ 300ml',             SEC['tong-tra'], 325000, 390000, IMG.cp3],
  ['Tống Trà Gốm Celadon 400ml',           SEC['tong-tra'], 265000, 320000, IMG.cp4],
  ['Tống Trà Inox Cao Cấp 500ml',          SEC['tong-tra'], 225000, 270000, IMG.cp5],

  // ── Bếp đun nước
  ['Bếp Điện Gốm Sứ Bát Tràng 800W',      SEC['bep-dun-nuoc'], 485000, 580000, IMG.tr1],
  ['Bếp Cồn Đun Ấm Trà Truyền Thống',     SEC['bep-dun-nuoc'], 185000, 225000, IMG.tr2],
  ['Bếp Hồng Ngoại Mini Pha Trà',         SEC['bep-dun-nuoc'], 365000, 440000, IMG.tr3],
  ['Ấm Điện Gốm Sứ 1.2L Cao Cấp',        SEC['bep-dun-nuoc'], 545000, 655000, IMG.tr4],
  ['Bếp Đun Nước Than Hoa Cổ Điển',       SEC['bep-dun-nuoc'], 285000, 345000, IMG.tr5],

  // ── Cung Nhãn Trà
  ['Cung Nhãn Trà Gỗ Tự Nhiên Cao Cấp',  SEC['cung-nhan-tra'], 125000, 150000, IMG.ts1],
  ['Cung Nhãn Trà Tre Mạnh Tông',         SEC['cung-nhan-tra'],  85000, 100000, IMG.ts2],
  ['Cung Nhãn Trà Sứ Men Ngọc',           SEC['cung-nhan-tra'], 165000, 200000, IMG.ts3],
  ['Cung Nhãn Trà Tử Sa Nhỏ',             SEC['cung-nhan-tra'], 245000, 295000, IMG.ts4],
  ['Bộ Cung Nhãn Trà 5 Cái Đa Năng',     SEC['cung-nhan-tra'], 195000, 235000, IMG.ts5],

  // ── Miếng lót chén
  ['Miếng Lót Chén Trà Tre Đan Tay',      SEC['mieng-lot-chen'],  45000,  55000, IMG.tr1],
  ['Miếng Lót Gốm Sứ Hoa Văn',           SEC['mieng-lot-chen'],  85000, 100000, IMG.tr2],
  ['Bộ Miếng Lót Silicone Chịu Nhiệt 6c', SEC['mieng-lot-chen'],  65000,  80000, IMG.tr3],
  ['Miếng Lót Chén Gỗ Mộc Cao Cấp',      SEC['mieng-lot-chen'], 125000, 150000, IMG.tr4],
  ['Miếng Lót Vải Thêu Tay Thủ Công',    SEC['mieng-lot-chen'],  95000, 115000, IMG.tr5],

  // ── Cốc uống trà
  ['Cốc Trà Tử Sa Có Nắp 350ml',          SEC['coc-uong-tra'], 185000, 225000, IMG.cp1],
  ['Cốc Trà Sứ Vẽ Tay Có Nắp 400ml',     SEC['coc-uong-tra'], 145000, 175000, IMG.cp2],
  ['Cốc Trà Thủy Tinh Chịu Nhiệt 500ml',  SEC['coc-uong-tra'], 125000, 150000, IMG.cp3],
  ['Cốc Trà Gốm Bát Tràng 300ml',         SEC['coc-uong-tra'], 165000, 200000, IMG.cp4],
  ['Cốc Trà Inox Cao Cấp Giữ Nhiệt',      SEC['coc-uong-tra'], 245000, 295000, IMG.cp5],

  // ── Thuyền trà
  ['Thuyền Trà Gỗ Nguyên Khối Cao Cấp',  SEC['thuyen-tra'], 685000, 820000, IMG.tr1],
  ['Thuyền Trà Tre Đan Thủ Công 45cm',    SEC['thuyen-tra'], 325000, 390000, IMG.tr2],
  ['Thuyền Trà Đá Granite Tự Nhiên',      SEC['thuyen-tra'], 985000,1180000, IMG.tr3],
  ['Thuyền Trà Gỗ Gụ Chạm Rồng 50cm',   SEC['thuyen-tra'], 1250000,1500000,IMG.tr4],
  ['Thuyền Trà Nhựa ABS Chống Thấm',     SEC['thuyen-tra'], 165000, 200000, IMG.tr5],
];

const insert = db.transaction(rows => rows.forEach(r => pStmt.run(...r)));
insert(rows);

console.log(`Seed OK: ${rows.length} products across ${Object.keys(SEC).length} sections in 3 groups`);

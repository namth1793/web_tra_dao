const { db } = require('./database');

const U = id => `https://images.unsplash.com/photo-${id}?w=800&h=500&fit=crop&auto=format&q=80`;

const posts = [
  {
    title: 'Hướng Dẫn Cách Khai Ấm Tử Sa Đúng Chuẩn Cho Người Mới Bắt Đầu',
    slug: 'huong-dan-khai-am-tu-sa',
    excerpt: 'Khai ấm là bước đầu tiên và quan trọng nhất khi sở hữu một chiếc ấm Tử Sa mới. Hãy cùng tìm hiểu quy trình khai ấm đúng cách để bảo vệ và phát huy tối đa giá trị của ấm.',
    image_url: U('1544787219-7f47ccb76574'),
    category: 'Kiến thức trà đạo',
    content: `Khai ấm là nghi thức bắt buộc và thiêng liêng mà bất kỳ người yêu ấm Tử Sa nào cũng cần thực hiện khi sở hữu một chiếc ấm mới. Đây không chỉ là bước làm sạch ấm mà còn là quá trình "khai thông" các lỗ khí cực nhỏ trong đất Tử Sa, giúp ấm sẵn sàng hấp thụ hương trà tốt nhất.

**Bước 1: Rửa sạch ấm bằng nước ấm**
Dùng nước ấm (không phải nước sôi) để tráng qua bên ngoài và bên trong ấm, loại bỏ bụi bẩn từ quá trình đóng gói và vận chuyển.

**Bước 2: Luộc ấm trong nước lạnh**
Cho ấm vào nồi nước lạnh, bật bếp đun từ từ đến khi sôi. Để ấm trong nước sôi khoảng 10-15 phút. Việc tăng nhiệt từ từ giúp tránh sốc nhiệt, bảo vệ ấm khỏi bị nứt.

**Bước 3: Tráng ấm bằng nước trà**
Pha một ấm trà đặc (dùng trà mà bạn dự định pha với ấm này). Đổ nước trà đang sôi vào đầy ấm, đậy nắp lại và để khoảng 30 phút. Đồng thời dùng nước trà sôi tưới đều lên bên ngoài ấm.

**Bước 4: Để ấm khô tự nhiên**
Sau khi hoàn thành các bước trên, đặt ấm lên giá và để khô hoàn toàn trong không khí. Không dùng khăn lau để tránh để lại vết.

Sau khi khai ấm xong, chiếc ấm Tử Sa của bạn đã sẵn sàng để bắt đầu hành trình "nuôi ấm" – một quá trình thú vị và có giá trị với mỗi người yêu trà.`,
  },
  {
    title: 'Phân Biệt Đất Tử Sa Thật & Giả: Những Dấu Hiệu Nhận Biết Quan Trọng',
    slug: 'phan-biet-dat-tu-sa-that-gia',
    excerpt: 'Thị trường ấm Tử Sa hiện nay có không ít sản phẩm kém chất lượng, pha trộn hóa chất. Bài viết này sẽ giúp bạn nhận biết đất Tử Sa nguyên khoáng thật sự.',
    image_url: U('1571934811356-5cc061b6821f'),
    category: 'Kiến thức trà đạo',
    content: `Đất Tử Sa Nghi Hưng nguyên khoáng là loại đất quý hiếm, được khai thác từ mỏ đất thiên nhiên tại vùng Nghi Hưng, tỉnh Giang Tô, Trung Quốc. Tuy nhiên, do giá trị kinh tế cao, thị trường xuất hiện nhiều loại đất giả, pha trộn hóa chất để tạo màu sắc và kết cấu giống đất thật.

**Màu sắc tự nhiên**
Đất Tử Sa thật có màu sắc tự nhiên, không quá đồng đều và óng ánh. Đất tím có màu tím nhạt đến đậm tự nhiên, đất đỏ có màu đỏ nâu ấm áp, đất vàng có màu vàng đất tự nhiên. Hàng giả thường có màu quá đồng đều, quá sáng bóng hoặc có vẻ "nhựa".

**Bề mặt khi sờ vào**
Đất Tử Sa thật khi sờ vào cảm giác nhám nhẹ, mịn như da người. Có thể thấy các hạt cát siêu nhỏ dưới ánh sáng mạnh. Hàng giả thường có cảm giác quá mịn, quá bóng hoặc có cảm giác nhựa.

**Thử với nước**
Đổ nước lên bề mặt ấm: ấm Tử Sa thật sẽ hút nước nhanh, bề mặt ấm nhạt màu và hút ẩm. Ấm giả làm từ đất thường hoặc pha trộn sẽ đẩy nước ra ngoài, nước đọng thành giọt.

**Mùi khi đun**
Khi đun ấm mới bằng nước sôi, ấm Tử Sa thật sẽ không có mùi lạ hoặc chỉ có mùi đất nhẹ tự nhiên. Ấm giả có thể có mùi hóa chất, mùi sơn hoặc mùi nhựa khó chịu.

Hãy luôn mua ấm Tử Sa từ những địa chỉ uy tín, có chứng thư nghệ nhân và cam kết rõ ràng về nguồn gốc sản phẩm.`,
  },
  {
    title: 'Ấm Tử Sa Tây Thi – Vẻ Đẹp Dịu Dàng Của Người Đẹp Đất Việt',
    slug: 'am-tu-sa-tay-thi',
    excerpt: 'Trong số các dáng ấm Tử Sa Nghi Hưng, Tây Thi được mệnh danh là dáng ấm đẹp nhất, mang vẻ đẹp dịu dàng và nữ tính được lấy cảm hứng từ tứ đại mỹ nhân.',
    image_url: U('1556742400-b5b7b99e7a0f'),
    category: 'Dáng ấm trà',
    content: `Dáng ấm Tây Thi (西施壶 – Xī Shī hú) được đặt theo tên của Tây Thi – một trong Tứ đại mỹ nhân của Trung Quốc cổ đại. Dáng ấm này được ra đời từ thời nhà Tống, đến nay đã có hơn 1000 năm lịch sử và vẫn là một trong những dáng ấm được yêu thích nhất.

**Đặc điểm nhận dạng**
Ấm Tây Thi có thân ấm tròn đầy, phần trên thu lại nhẹ nhàng rồi mở ra ở miệng ấm. Nắp ấm dạng nút tròn nhô cao, vòi ấm cong nhẹ, tay cầm thanh mảnh. Toàn bộ đường nét của ấm mềm mại, uyển chuyển như vẻ đẹp của người phụ nữ.

**Ý nghĩa trong văn hóa trà đạo**
Theo quan niệm của người xưa, ấm Tây Thi tượng trưng cho sự dịu dàng, nữ tính và ôn hòa. Nhiều trà nhân tin rằng sử dụng ấm Tây Thi để pha trà sẽ mang lại cảm giác thư thái, tâm hồn bình yên.

**Phù hợp với loại trà nào**
Ấm Tây Thi với dung tích thường từ 150-250ml, phù hợp để pha các loại trà ô long nhẹ như Thiết Quan Âm, Cao Sơn, Bạch Hào Ô Long. Dung tích vừa phải cho phép trải nghiệm đầy đủ hương vị từng tách trà.`,
  },
  {
    title: 'Bộ Ấm Trà Quà Tặng Cao Cấp – Ý Nghĩa Và Cách Chọn Phù Hợp',
    slug: 'bo-am-tra-qua-tang-cao-cap',
    excerpt: 'Một bộ ấm trà cao cấp không chỉ là món quà sang trọng mà còn mang nhiều ý nghĩa văn hóa sâu sắc. Hướng dẫn chọn bộ ấm trà làm quà tặng ý nghĩa nhất.',
    image_url: U('1563822249366-3efb23b8e0c9'),
    category: 'Tư vấn mua hàng',
    content: `Trong văn hóa Á Đông, trà là biểu tượng của sự thanh cao, tao nhã và lòng tôn kính. Một bộ ấm trà cao cấp vì vậy luôn là món quà được trân trọng và lưu giữ lâu dài.

**Quà tặng cho đối tác doanh nghiệp**
Một bộ ấm Tử Sa hộp gỗ cao cấp, đi kèm chứng thư nghệ nhân và túi xách sang trọng là lựa chọn tuyệt vời. Giá trị nên từ 500.000đ trở lên. Nên chọn màu sắc trung tính như nâu đỏ, tím nhạt.

**Quà tặng cho cha mẹ, người lớn tuổi**
Người lớn tuổi thường thích những bộ ấm trà truyền thống, màu sắc ấm áp. Bộ ấm Đức Chung hay Thạch Biều màu nâu đất, đi kèm 4-6 chén trà là phù hợp. Tránh chọn màu quá sặc sỡ.

**Quà tặng cho bạn bè yêu trà**
Nếu bạn bè đã am hiểu về trà đạo, có thể chọn một chiếc ấm Tử Sa chính hãng đơn chiếc nhưng có chứng thư nghệ nhân. Đây sẽ được đánh giá cao hơn một bộ ấm trung bình.

**Lưu ý khi đặt hàng quà tặng**
Luôn yêu cầu hóa đơn GTGT từ nhà cung cấp, đặc biệt khi mua số lượng lớn cho doanh nghiệp. Xác nhận thời gian giao hàng trước ngày tặng quà ít nhất 3-5 ngày.`,
  },
  {
    title: 'Cách Nuôi Ấm Tử Sa Để Ấm Ngày Càng Đẹp Và Có Giá Trị',
    slug: 'cach-nuoi-am-tu-sa',
    excerpt: '"Nuôi ấm" là một nghệ thuật trong văn hóa trà đạo. Một chiếc ấm Tử Sa được nuôi đúng cách sẽ ngày càng bóng mượt, đẹp hơn và tăng giá trị theo thời gian.',
    image_url: U('1576092762791-5985bd2b0c30'),
    category: 'Kiến thức trà đạo',
    content: `"Nuôi ấm" (养壶 – yǎng hú) là quá trình chăm sóc và sử dụng ấm Tử Sa theo đúng cách để ấm ngày càng bóng mượt, phát ra ánh sáng tự nhiên từ bên trong – người ta gọi là "bao tương" (包浆).

**Nguyên tắc cơ bản**
Dùng ấm thường xuyên, mỗi ngày nếu có thể. Chỉ dùng một loại trà cho một chiếc ấm (không pha lẫn nhiều loại). Sau mỗi lần pha trà, đổ nước trà tưới đều lên ngoài ấm và dùng khăn mềm lau nhẹ.

**Quy trình nuôi ấm hàng ngày**
Trước khi pha: dùng nước sôi tráng ấm và chén để làm ấm và làm sạch. Trong khi pha: thỉnh thoảng dùng nước trà thừa tưới lên mặt ngoài ấm. Sau khi pha: lau ấm bằng khăn mềm sạch, để hở nắp ấm cho khô tự nhiên.

**Những điều cần tránh**
Không để ấm tiếp xúc với dầu mỡ, nước hoa hay xà phòng. Không để ấm gần nguồn nhiệt trực tiếp khi không sử dụng. Không dùng khăn có sợi thô hoặc hóa chất tẩy rửa.

Một chiếc ấm Tử Sa được nuôi 5-10 năm có thể tăng giá trị gấp nhiều lần so với ban đầu, đặc biệt nếu đó là ấm của nghệ nhân uy tín.`,
  },
  {
    title: 'Khay Trà Gỗ Tự Nhiên – Trái Tim Của Bàn Trà Tao Nhã',
    slug: 'khay-tra-go-tu-nhien',
    excerpt: 'Khay trà không chỉ là vật đựng mà là trái tim của bàn trà. Một chiếc khay trà gỗ tự nhiên đẹp sẽ nâng tầm toàn bộ không gian thưởng trà của bạn.',
    image_url: U('1510707577719-ae7c14805e3a'),
    category: 'Tư vấn mua hàng',
    content: `Trong bộ trà cụ hoàn chỉnh, khay trà (茶盘 – chá pán) đóng vai trò như một sân khấu – nơi tất cả các trà cụ khác được trưng bày và sử dụng. Một chiếc khay trà gỗ tự nhiên đẹp không chỉ có công năng thoát nước mà còn tạo nên vẻ đẹp thẩm mỹ độc đáo cho không gian thưởng trà.

**Các loại gỗ phổ biến**
Gỗ gụ (Rosewood): Màu đỏ nâu đậm, vân gỗ đẹp, độ bền cao, là lựa chọn cao cấp nhất. Giá thành cao nhưng xứng đáng với chất lượng.

Gỗ tre (Bamboo): Thân thiện môi trường, nhẹ, chống ẩm tốt, giá thành phải chăng. Phù hợp cho người mới bắt đầu hoặc không gian hiện đại.

Gỗ tự nhiên phủ sơn: Đa dạng về kiểu dáng, giá cả phải chăng, dễ vệ sinh. Tuy nhiên cần kiểm tra chất lượng sơn để tránh ảnh hưởng đến trà.

**Kích thước phù hợp**
Khay trà 40x25cm: Phù hợp cho 1-2 người, bàn nhỏ. Khay trà 50x30cm: Phù hợp cho 2-4 người, tiêu chuẩn phổ biến nhất. Khay trà 60x35cm trở lên: Dành cho buổi trà đông người hoặc không gian tiếp khách lớn.`,
  },
];

const stmt = db.prepare('INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category) VALUES (?, ?, ?, ?, ?, ?)');
const insert = db.transaction(posts => posts.forEach(p => stmt.run(p.title, p.slug, p.excerpt, p.content, p.image_url, p.category)));
insert(posts);

console.log(`Blog seed OK: ${posts.length} posts`);

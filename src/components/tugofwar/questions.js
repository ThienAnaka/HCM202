const QUESTIONS = [
  { q: "Một địa phương phát động mạnh phong trào “học tập đạo đức” với rất nhiều tiêu chí thi đua và báo cáo thành tích, nhưng cán bộ lại né tránh tiếp xúc người dân khi có phản ánh tiêu cực. Theo tư tưởng Hồ Chí Minh, vấn đề nguy hiểm nhất của hiện tượng này là gì?", options: ["Làm giảm hiệu quả truyền thông chính trị", "Biến đạo đức thành công cụ hình thức thay vì giá trị hành động", "Gây mất cân đối giữa công tác dân vận và hành chính", "Tạo áp lực tâm lý cho đội ngũ cán bộ trẻ"], correct: 1 },
  { q: "Một sinh viên cho rằng: “Miễn mục tiêu cuối cùng là tốt cho xã hội thì việc sử dụng thủ đoạn thiếu trung thực trong quá trình thực hiện cũng có thể chấp nhận được.” Theo tư tưởng Hồ Chí Minh, sai lầm cốt lõi trong quan điểm này là gì?", options: ["Đặt hiệu quả lên trên tính kỷ luật tổ chức", "Tách rời mục đích cách mạng khỏi nền tảng đạo đức của hành động", "Đánh giá thấp vai trò của pháp luật nhà nước", "Hiểu chưa đúng về khái niệm lợi ích tập thể"], correct: 1 }, { q: "'Cần' trong tư tưởng đạo đức HCM có nghĩa là gì?", options: ["Tiết kiệm", "Siêng năng, chăm chỉ", "Trong sạch", "Chính trực"], correct: 1 },
  { q: "Từ tư tưởng Hồ Chí Minh, nhận định nào phản ánh đúng nhất mối quan hệ giữa đạo đức và tài năng của người cán bộ?", options: ["Đạo đức quan trọng hơn nên có thể thay thế năng lực chuyên môn", "Chuyên môn là yếu tố quyết định duy nhất trong xã hội hiện đại", "Đạo đức và năng lực phải thống nhất, trong đó đạo đức giữ vai trò nền tảng", "Người cán bộ chỉ cần giỏi một trong hai yếu tố là đủ"], correct: 2 }, { q: "'Liêm' trong tư tưởng đạo đức HCM có nghĩa là gì?", options: ["Tiết kiệm", "Chăm chỉ", "Trong sạch, không tham lam", "Ngay thẳng"], correct: 2 },
  { q: "Trong môi trường doanh nghiệp hiện đại, đâu là biểu hiện tinh vi nhất của chủ nghĩa cá nhân theo tư tưởng Hồ Chí Minh?", options: ["Công khai từ chối trách nhiệm trước tập thể", "Luôn ưu tiên quyền lợi vật chất cá nhân", "Dùng danh nghĩa cống hiến tập thể để xây dựng lợi ích và hình ảnh cá nhân", "Không tham gia các hoạt động xã hội tình nguyện"], correct: 2 }, { q: "Hồ Chí Minh ví đạo đức như gì của cây?", options: ["Lá", "Hoa", "Gốc/Rễ", "Cành"], correct: 2 },
  { q: "Một cán bộ trẻ phát hiện sai phạm của cấp trên nhưng lựa chọn im lặng với lý do “giữ sự ổn định của tổ chức”. Theo tư tưởng đạo đức Hồ Chí Minh, hạn chế nguy hiểm nhất trong nhận thức này là gì?", options: ["Đồng nhất sự im lặng với tinh thần đoàn kết", "Chưa hiểu đúng quy trình quản lý hành chính", "Quá đề cao trách nhiệm tập thể so với pháp luật", "Thiếu kỹ năng xử lý xung đột trong tổ chức"], correct: 0 },
  { q: "Một người nói: “Tôi không tham nhũng, không làm hại ai, vậy là đủ đạo đức rồi.” Theo tư tưởng Hồ Chí Minh, hạn chế lớn nhất trong cách hiểu này là gì?", options: ["Đồng nhất đạo đức với việc không vi phạm pháp luật", "Chưa hiểu đúng vai trò của lao động sản xuất", "Đề cao quyền cá nhân hơn quyền tập thể", "Xem nhẹ giá trị của giáo dục gia đình"], correct: 0 },
  { q: "Đâu là trường hợp phản ánh đúng nhất sự tha hóa đạo đức theo tư tưởng Hồ Chí Minh dù bề ngoài vẫn “đúng quy trình”?", options: ["Một cán bộ xử lý hồ sơ chậm vì năng lực hạn chế", "Một người nghiêm túc tuân thủ mọi thủ tục nhưng luôn tìm cách né trách nhiệm với dân", "Một nhân viên thường tranh luận với cấp trên trong cuộc họp", "Một sinh viên phản biện giảng viên về quan điểm học thuật"], correct: 1 },
  { q: "Nếu phải chọn tình huống thể hiện rõ nhất sự đối lập với tinh thần “chí công vô tư”, trường hợp nào khó nhận ra nhưng nguy hiểm nhất?", options: ["Công khai ưu tiên người thân trong tuyển dụng", "Nhận hối lộ để giải quyết công việc", "Ra quyết định “vì lợi ích tập thể” nhưng thực chất nhằm củng cố vị trí cá nhân", "Từ chối hỗ trợ đồng nghiệp vì mâu thuẫn cá nhân"], correct: 2 },
  { q: "Một người có xu hướng chỉ trích rất mạnh các biểu hiện suy thoái đạo đức trong xã hội, nhưng lại cho rằng những “thỏa hiệp nhỏ” của bản thân là điều bình thường để thích nghi môi trường sống. Theo tư tưởng Hồ Chí Minh, điều nguy hiểm nhất ở kiểu nhận thức này là:", options: ["Đánh mất khả năng tự phê bình bản thân", "Hiểu sai về chuẩn mực đạo đức truyền thống", "Đề cao lý luận hơn thực tiễn", "Thiếu tinh thần đoàn kết tập thể"], correct: 0 },
  { q: "Trong tư tưởng Hồ Chí Minh, vì sao chủ nghĩa cá nhân được xem là “kẻ thù nguy hiểm” của đạo đức cách mạng ngay cả khi nó không biểu hiện thành hành vi sai phạm rõ ràng?", options: ["Vì nó luôn dẫn trực tiếp đến vi phạm pháp luật", "Vì nó âm thầm làm lệch động cơ, lý tưởng và cách nhìn về lợi ích chung", "Vì nó khiến con người giảm hiệu suất lao động", "Vì nó làm suy yếu tinh thần cạnh tranh trong xã hội"], correct: 1 },
  { q: "Trong tác phẩm “Đường Kách Mệnh” (1927), Hồ Chí Minh viết: “Tự mình phải: cần kiệm, hòa mà không tư, cả quyết sửa lỗi mình…”. Ý nghĩa sâu nhất của tư tưởng này đối với đạo đức người cách mạng là gì?", options: ["Đạo đức chủ yếu nhằm xây dựng hình ảnh cá nhân trước quần chúng", "Người cách mạng phải ưu tiên rèn luyện bản thân trước khi giáo dục người khác", "Đạo đức chỉ cần thiết trong giai đoạn đấu tranh cách mạng", "Việc tự phê bình chỉ mang ý nghĩa tổ chức nội bộ"], correct: 1 }, { q: "'Hiếu với dân' theo HCM có nghĩa là gì?", options: ["Hiếu thảo với cha mẹ", "Phục vụ nhân dân hết lòng", "Nghe lời dân", "Cho dân tiền"], correct: 1 },
  { q: "Trong bài thơ “Nghe tiếng giã gạo” trong tập “Nhật ký trong tù”, Hồ Chí Minh viết: “Gạo đem vào giã bao đau đớn / Gạo giã xong rồi trắng tựa bông”. Liên hệ với tư tưởng đạo đức Hồ Chí Minh, hình ảnh này nhấn mạnh điều gì?", options: ["Giá trị của lao động chân tay trong xã hội", "Con người muốn hoàn thiện phải trải qua quá trình rèn luyện và thử thách", "Đạo đức cách mạng hình thành chủ yếu từ tri thức lý luận", "Đấu tranh cách mạng luôn gắn với hy sinh vật chất"], correct: 1 }, { q: "HCM quan niệm tinh thần quốc tế trong sáng là gì?", options: ["Bài ngoại", "Đoàn kết với nhân dân các nước vì hòa bình, công lý", "Sống cô lập", "Chỉ quan hệ nước lớn"], correct: 1 },
  { q: "Đâu là biểu hiện nguy hiểm hơn theo tư tưởng đạo đức Hồ Chí Minh?", options: ["Một người công khai theo đuổi lợi ích cá nhân", "Một người nhân danh lợi ích tập thể để phục vụ lợi ích cá nhân", "Một người có năng lực nhưng ít tham gia hoạt động xã hội", "Một người quá đề cao thành tích cá nhân trong học tập"], correct: 1 },
  { q: "HCM nhấn mạnh mối quan hệ giữa đức và tài như thế nào?", options: ["Chỉ cần tài", "Chỉ cần đức", "Có tài mà không có đức là vô dụng", "Đức và tài không liên quan"], correct: 2 },
  { q: "Tác phẩm nào của HCM bàn nhiều về đạo đức cách mạng?", options: ["Bản án chế độ thực dân", "Đường Kách Mệnh", "Sửa đổi lối làm việc", "Tuyên ngôn độc lập"], correct: 2 },
  { q: "Một cán bộ luôn hoàn thành chỉ tiêu, không vi phạm quy định nhưng khi giải quyết công việc lại có thái độ vô cảm, né tránh khó khăn của người dân. Nếu đánh giá theo tư tưởng Hồ Chí Minh, thiếu sót cốt lõi của người này là gì?", options: ["Thiếu tinh thần quốc tế vô sản", "Chưa đáp ứng yêu cầu “đức” trong mối quan hệ với nhân dân", "Chưa phát huy hết năng lực chuyên môn", "Quá phụ thuộc vào cơ chế hành chính"], correct: 1 },
  { q: "Theo HCM, muốn xây dựng CNXH trước hết cần gì?", options: ["Nhiều tiền", "Con người XHCN (có đạo đức)", "Vũ khí", "Công nghệ"], correct: 1 },
  { q: "Theo tư tưởng Hồ Chí Minh, điều nào dưới đây phản ánh đúng nhất mối nguy của sự suy thoái đạo đức trong một tổ chức?", options: ["Làm giảm hiệu quả quản lý kinh tế", "Làm tổ chức mất tính cạnh tranh trước đối thủ", "Làm suy giảm niềm tin của quần chúng đối với tổ chức và lý tưởng mà tổ chức đại diện", "Làm tăng mâu thuẫn cá nhân trong nội bộ"], correct: 2 },
  { q: "Theo HCM, rèn luyện đạo đức phải thực hiện như thế nào?", options: ["Chỉ khi trẻ", "Thường xuyên, suốt đời", "Khi có thời gian rảnh", "Chỉ khi làm cán bộ"], correct: 1 },
  { q: "Trong bối cảnh mạng xã hội hiện nay, điều nào phản ánh đúng nhất tinh thần “tự phê bình và phê bình” theo tư tưởng Hồ Chí Minh?", options: ["Công khai chỉ trích người khác để tạo áp lực dư luận", "Tránh góp ý để giữ hòa khí trong tập thể", "Chỉ tiếp nhận góp ý từ người có vị trí cao hơn mình", "Dám nhìn nhận thiếu sót của bản thân và góp ý với mục đích xây dựng"], correct: 3 },
  { q: "Một sinh viên tham gia hoạt động tình nguyện rất tích cực nhưng chủ yếu để xây dựng hồ sơ cá nhân và tạo hình ảnh trên mạng xã hội. Nếu đánh giá theo tư tưởng Hồ Chí Minh, điều gì phản ánh đúng nhất bản chất của vấn đề?", options: ["Hoạt động xã hội quan trọng hơn động cơ cá nhân", "Đây là xu hướng bình thường của thời đại số", "Kết quả đạt được cho cộng đồng là yếu tố duy nhất cần quan tâm", "Giá trị đạo đức bị giảm sút khi hành động thiếu sự chân thành và động cơ đúng đắn"], correct: 3 },
  { q: "Trong tác phẩm “Sửa đổi lối làm việc” (1947), Hồ Chí Minh phê phán bệnh “nói mà không làm”. Liên hệ với sinh viên hiện nay, biểu hiện nào dưới đây phù hợp nhất với điều Người muốn cảnh báo?", options: ["Đề cao lý tưởng sống nhưng thiếu kỹ năng mềm", "Có quan điểm cá nhân khác với số đông", "Chỉ tập trung học chuyên môn mà ít tham gia hoạt động xã hội", "Thường xuyên chia sẻ quan điểm tích cực về học tập và phát triển bản thân nhưng lại thiếu kỷ luật trong hành động thực tế"], correct: 3 },
  { q: "Một sinh viên cho rằng: “Miễn mình không ảnh hưởng trực tiếp đến ai thì việc sống thờ ơ với vấn đề chung của tập thể cũng không có gì sai.” Theo tư tưởng Hồ Chí Minh, hạn chế lớn nhất trong nhận thức này là gì?", options: ["Chưa hiểu đúng vai trò của pháp luật trong xã hội", "Đề cao tự do cá nhân hơn năng lực chuyên môn", "Xem nhẹ ảnh hưởng của mạng xã hội đối với giới trẻ", "Tách rời trách nhiệm cá nhân khỏi mối quan hệ với cộng đồng và tập thể"], correct: 3 },
  [
  {
    q: "Một sinh viên luôn cố gắng đạt điểm cao nhưng thường xuyên gian lận trong kiểm tra vì cho rằng kết quả quan trọng hơn quá trình. Theo tư tưởng Hồ Chí Minh về đạo đức, sai lầm cốt lõi là gì?",
    options: ["Đặt lợi ích tập thể lên trên lợi ích cá nhân", "Coi nhẹ sự trung thực và phẩm chất đạo đức trong học tập", "Chưa phát huy tinh thần đoàn kết", "Thiếu kỹ năng quản lý thời gian"],
    correct: 1
  },
  {
    q: "Một cán bộ cho rằng chỉ cần giỏi chuyên môn thì không cần quan tâm nhiều đến việc rèn luyện đạo đức. Theo Hồ Chí Minh, nhận định này chưa đúng vì sao?",
    options: ["Đạo đức và tài năng phải được phát triển hài hòa", "Chuyên môn không quan trọng bằng chính trị", "Đạo đức chỉ cần thiết với người lãnh đạo", "Tài năng luôn quyết định mọi thành công"],
    correct: 0
  },
  {
    q: "Một người thường xuyên tham gia hoạt động thiện nguyện nhưng chỉ nhằm mục đích được khen ngợi và nổi tiếng. Theo tư tưởng Hồ Chí Minh, hành động này còn hạn chế ở điểm nào?",
    options: ["Thiếu tinh thần quốc tế", "Chưa thực hành cần kiệm", "Động cơ hành động chưa xuất phát từ lợi ích chung và sự chân thành", "Chưa có đủ năng lực tổ chức"],
    correct: 2
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, phẩm chất nào dưới đây là nền tảng quan trọng để xây dựng đạo đức cách mạng?",
    options: ["Danh tiếng cá nhân", "Lòng trung thành với lợi ích của nhân dân và đất nước", "Khả năng thuyết trình", "Trình độ ngoại ngữ"],
    correct: 1
  },
  {
    q: "Một người cho rằng chỉ cần không vi phạm pháp luật là đã đủ để được xem là có đạo đức. Theo Hồ Chí Minh, nhận thức này thiếu sót ở điểm nào?",
    options: ["Đạo đức đòi hỏi sự tự giác rèn luyện vượt lên trên yêu cầu tối thiểu của pháp luật", "Pháp luật không có vai trò trong xã hội", "Đạo đức chỉ áp dụng với cán bộ", "Đạo đức phụ thuộc hoàn toàn vào phong tục"],
    correct: 0
  },
  {
    q: "Một cán bộ thường xuyên nhận thành tích về mình nhưng đổ lỗi cho tập thể khi xảy ra sai sót. Theo tư tưởng Hồ Chí Minh, biểu hiện này phản ánh điều gì?",
    options: ["Tinh thần trách nhiệm cao", "Chủ nghĩa cá nhân", "Tính sáng tạo", "Tinh thần tự phê bình"],
    correct: 1
  },
  {
    q: "Theo Hồ Chí Minh, vì sao đạo đức cách mạng không phải là điều có sẵn?",
    options: ["Vì phụ thuộc vào hoàn cảnh kinh tế", "Vì chỉ được hình thành qua giáo dục nhà trường", "Vì phải được rèn luyện bền bỉ trong thực tiễn hằng ngày", "Vì chỉ xuất hiện ở người lớn tuổi"],
    correct: 2
  },
  {
    q: "Một sinh viên tích cực tham gia phong trào nhưng luôn coi thường ý kiến đóng góp của người khác. Theo tư tưởng Hồ Chí Minh, hạn chế lớn nhất là gì?",
    options: ["Thiếu tinh thần dân chủ và tôn trọng tập thể", "Thiếu kiến thức chuyên môn", "Thiếu kỹ năng lãnh đạo", "Thiếu điều kiện vật chất"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, phẩm chất 'kiệm' được hiểu đúng nhất là gì?",
    options: ["Tiêu dùng càng ít càng tốt", "Tích lũy tài sản cho cá nhân", "Sử dụng hợp lý thời gian, tiền bạc và nguồn lực, tránh lãng phí", "Không tham gia các hoạt động xã hội"],
    correct: 2
  },
  {
    q: "Một người luôn muốn được giao việc nhẹ và né tránh nhiệm vụ khó khăn. Theo Hồ Chí Minh, đây là biểu hiện trái với phẩm chất nào?",
    options: ["Chí công vô tư", "Tinh thần quốc tế", "Hiếu học", "Khiêm tốn"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, mục tiêu cuối cùng của việc tu dưỡng đạo đức là gì?",
    options: ["Được xã hội tôn vinh", "Đạt địa vị cao", "Phục vụ nhân dân và đóng góp cho sự phát triển của đất nước", "Tăng thu nhập cá nhân"],
    correct: 2
  },
  {
    q: "Một cán bộ lợi dụng chức vụ để ưu tiên người thân trong tuyển dụng. Theo tư tưởng Hồ Chí Minh, hành vi này vi phạm nghiêm trọng phẩm chất nào?",
    options: ["Cần", "Kiệm", "Liêm", "Dũng"],
    correct: 2
  },
  {
    q: "Theo Hồ Chí Minh, điều gì là nguy cơ lớn nhất làm suy thoái đạo đức của người cán bộ?",
    options: ["Thiếu bằng cấp", "Chủ nghĩa cá nhân", "Thiếu kinh nghiệm", "Thiếu ngoại ngữ"],
    correct: 1
  },
  {
    q: "Một sinh viên thường xuyên hứa hẹn tham gia công việc nhóm nhưng lại không thực hiện. Theo tư tưởng Hồ Chí Minh, điều này cho thấy hạn chế nào?",
    options: ["Thiếu tính kỷ luật và tinh thần trách nhiệm", "Thiếu năng lực học tập", "Thiếu điều kiện tài chính", "Thiếu kỹ năng giao tiếp"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, việc tự phê bình và phê bình có ý nghĩa chủ yếu gì?",
    options: ["Tìm ra lỗi của người khác", "Nâng cao uy tín cá nhân", "Giúp cá nhân và tập thể tiến bộ, sửa chữa khuyết điểm", "Tăng khả năng cạnh tranh"],
    correct: 2
  },
  {
    q: "Một người chỉ nhiệt tình giúp đỡ khi có lợi ích cho bản thân. Theo Hồ Chí Minh, hạn chế lớn nhất trong cách ứng xử này là gì?",
    options: ["Thiếu tinh thần vị tha và phục vụ cộng đồng", "Thiếu kiến thức xã hội", "Thiếu kinh nghiệm sống", "Thiếu khả năng lãnh đạo"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, phẩm chất 'chính' yêu cầu điều gì?",
    options: ["Sống và làm việc ngay thẳng, công tâm, đúng đắn", "Ưu tiên lợi ích gia đình", "Tập trung phát triển kinh tế cá nhân", "Luôn giữ quan điểm của mình"],
    correct: 0
  },
  {
    q: "Một cán bộ ngại tiếp xúc với người dân vì cho rằng ý kiến của họ không quan trọng. Theo Hồ Chí Minh, nhận thức này sai ở điểm nào?",
    options: ["Đánh giá thấp vai trò của nhân dân trong sự nghiệp cách mạng", "Quá coi trọng pháp luật", "Đề cao tinh thần tự học", "Thiếu kiến thức kinh tế"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, đạo đức cách mạng được thể hiện rõ nhất thông qua yếu tố nào?",
    options: ["Lời nói", "Danh hiệu", "Hành động và việc làm cụ thể", "Trình độ học vấn"],
    correct: 2
  },
  {
    q: "Một người thường xuyên đổ lỗi cho hoàn cảnh thay vì tự nhìn nhận thiếu sót của bản thân. Theo Hồ Chí Minh, điều này cho thấy họ còn thiếu điều gì?",
    options: ["Tinh thần tự phê bình và ý thức rèn luyện bản thân", "Khả năng thích nghi", "Năng lực chuyên môn", "Tinh thần quốc tế"],
    correct: 0
  },
  [
  {
    q: "Một sinh viên cho rằng việc tham gia hoạt động cộng đồng chỉ nên thực hiện khi mang lại lợi ích trực tiếp cho bản thân. Theo tư tưởng Hồ Chí Minh, hạn chế lớn nhất của quan điểm này là gì?",
    options: ["Thiếu kiến thức quản lý", "Đặt lợi ích cá nhân lên trên lợi ích tập thể và xã hội", "Chưa có kỹ năng giao tiếp", "Thiếu tinh thần sáng tạo"],
    correct: 1
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, điều gì quyết định giá trị đạo đức của một con người?",
    options: ["Địa vị xã hội", "Tài sản sở hữu", "Mục đích và hành động phục vụ nhân dân", "Trình độ học vấn"],
    correct: 2
  },
  {
    q: "Một cán bộ luôn hứa hẹn nhiều nhưng ít khi thực hiện cam kết. Theo Hồ Chí Minh, điều này trái với yêu cầu nào của đạo đức cách mạng?",
    options: ["Nói đi đôi với làm", "Cần kiệm", "Tinh thần quốc tế", "Học tập suốt đời"],
    correct: 0
  },
  {
    q: "Một người làm việc chăm chỉ nhưng thường xuyên lãng phí thời gian và nguồn lực chung. Theo tư tưởng Hồ Chí Minh, người này còn thiếu phẩm chất nào?",
    options: ["Kiệm", "Liêm", "Chính", "Chí công vô tư"],
    correct: 0
  },
  {
    q: "Theo Hồ Chí Minh, vì sao người cán bộ cần gần gũi nhân dân?",
    options: ["Để nâng cao danh tiếng cá nhân", "Để hiểu dân, học dân và phục vụ nhân dân tốt hơn", "Để dễ được thăng chức", "Để tăng thu nhập"],
    correct: 1
  },
  {
    q: "Một sinh viên thường xuyên sao chép bài tập của bạn bè vì cho rằng kết quả cuối cùng mới là quan trọng. Theo tư tưởng Hồ Chí Minh, hạn chế chính là gì?",
    options: ["Thiếu trung thực và ý thức tự rèn luyện", "Thiếu kỹ năng nghiên cứu", "Thiếu khả năng làm việc nhóm", "Thiếu điều kiện học tập"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, phẩm chất nào giúp con người vượt qua khó khăn, thử thách để hoàn thành nhiệm vụ?",
    options: ["Dũng", "Kiệm", "Liêm", "Khiêm tốn"],
    correct: 0
  },
  {
    q: "Một cán bộ luôn ưu tiên lợi ích của cơ quan mình mà bỏ qua lợi ích chung của xã hội. Theo Hồ Chí Minh, đây là biểu hiện của điều gì?",
    options: ["Tinh thần trách nhiệm", "Cục bộ, vị kỷ", "Tính sáng tạo", "Tinh thần dân chủ"],
    correct: 1
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, đạo đức có vai trò như thế nào đối với người cách mạng?",
    options: ["Là yếu tố phụ trợ", "Là công cụ để đạt danh vọng", "Là gốc, là nền tảng của người cách mạng", "Chỉ cần thiết khi giữ chức vụ lãnh đạo"],
    correct: 2
  },
  {
    q: "Một người thường xuyên khoe khoang thành tích và xem thường đồng nghiệp. Theo Hồ Chí Minh, người này còn thiếu phẩm chất gì?",
    options: ["Khiêm tốn", "Dũng cảm", "Tiết kiệm", "Kiên trì"],
    correct: 0
  },
  {
    q: "Theo Hồ Chí Minh, biểu hiện nào sau đây phù hợp với tinh thần chí công vô tư?",
    options: ["Luôn bảo vệ người thân trong mọi trường hợp", "Đặt việc công lên trên lợi ích cá nhân", "Ưu tiên lợi ích cá nhân trước", "Chỉ giúp đỡ người quen"],
    correct: 1
  },
  {
    q: "Một cán bộ từ chối nhận trách nhiệm khi cơ quan xảy ra sai sót. Theo tư tưởng Hồ Chí Minh, hành vi này cho thấy điều gì?",
    options: ["Thiếu tinh thần trách nhiệm", "Có tư duy quản lý tốt", "Biết bảo vệ bản thân", "Có năng lực chuyên môn cao"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, việc học tập đạo đức cần được thực hiện như thế nào?",
    options: ["Chỉ trong nhà trường", "Khi có yêu cầu của tổ chức", "Thường xuyên, suốt đời", "Chỉ khi còn trẻ"],
    correct: 2
  },
  {
    q: "Một người cho rằng giúp đỡ người khác là việc của những ai có điều kiện kinh tế tốt. Theo Hồ Chí Minh, nhận thức này chưa đúng vì sao?",
    options: ["Đạo đức không phụ thuộc hoàn toàn vào điều kiện vật chất", "Người nghèo không nên giúp người khác", "Đạo đức chỉ là trách nhiệm của Nhà nước", "Giúp người khác phải có lợi ích vật chất"],
    correct: 0
  },
  {
    q: "Theo Hồ Chí Minh, biểu hiện nào dưới đây thể hiện đúng tinh thần đoàn kết?",
    options: ["Áp đặt ý kiến cá nhân lên tập thể", "Tôn trọng, hợp tác và hướng tới mục tiêu chung", "Chỉ làm việc với người cùng quan điểm", "Tránh tranh luận trong mọi tình huống"],
    correct: 1
  },
  {
    q: "Một sinh viên chỉ học những môn có lợi cho nghề nghiệp tương lai và xem nhẹ giáo dục đạo đức. Theo tư tưởng Hồ Chí Minh, hạn chế lớn nhất là gì?",
    options: ["Chưa phát triển toàn diện cả đức và tài", "Thiếu kỹ năng mềm", "Thiếu khả năng nghiên cứu", "Thiếu hiểu biết pháp luật"],
    correct: 0
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, nguyên nhân nào khiến việc rèn luyện đạo đức trở nên khó khăn?",
    options: ["Sự tác động của chủ nghĩa cá nhân và những cám dỗ trong cuộc sống", "Thiếu giáo trình phù hợp", "Thiếu công nghệ hỗ trợ", "Thiếu các hoạt động giải trí"],
    correct: 0
  },
  {
    q: "Một cán bộ luôn lắng nghe ý kiến nhân dân trước khi đưa ra quyết định quan trọng. Theo Hồ Chí Minh, điều này thể hiện phẩm chất gì?",
    options: ["Quan liêu", "Tôn trọng nhân dân và thực hành dân chủ", "Vị lợi cá nhân", "Thiếu quyết đoán"],
    correct: 1
  },
  {
    q: "Theo tư tưởng Hồ Chí Minh, điều gì giúp con người duy trì và phát triển phẩm chất đạo đức tốt đẹp?",
    options: ["Sự giám sát của người khác", "Tự giác tu dưỡng và rèn luyện không ngừng", "Địa vị xã hội cao", "Khả năng hùng biện"],
    correct: 1
  },
  {
    q: "Một người thường xuyên tham gia các phong trào tập thể nhưng chỉ để được khen thưởng. Theo tư tưởng Hồ Chí Minh, hạn chế chủ yếu nằm ở đâu?",
    options: ["Thiếu năng lực lãnh đạo", "Động cơ chưa trong sáng, còn nặng lợi ích cá nhân", "Thiếu kinh nghiệm xã hội", "Thiếu kiến thức chính trị"],
    correct: 1
  }
]
]

];

export default QUESTIONS;

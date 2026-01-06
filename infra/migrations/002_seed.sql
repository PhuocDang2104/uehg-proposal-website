INSERT INTO events (
  id, slug, title, type, status, start_time, end_time, venue_name, venue_address, city, ticket_url, price_min,
  price_max, description_md, poster_image_url, tags
) VALUES
(
  '8a3f72c8-1b9a-4f3f-9e7d-0c2a0e2f0a11',
  'spring-jam-night',
  'Spring Jam Night',
  'show',
  'upcoming',
  '2026-02-10T19:30:00+07:00',
  '2026-02-10T21:30:00+07:00',
  'Hoi truong A.116 UEH',
  '279 Nguyen Tri Phuong, Q10',
  'Ho Chi Minh',
  'https://tickets.uehg.vn/spring-jam-night',
  150000,
  250000,
  'Dem nhac giao luu dac sac voi chu de Spring Jam, ket noi thanh vien va khan gia.',
  '/images/events/spring-jam-night.jpg',
  ARRAY['jazz','acoustic']
),
(
  'b14d0c89-5f4e-4d3a-9eb4-2a1a3e1c9d22',
  'recap-night-2025',
  'Recap Night 2025',
  'show',
  'past',
  '2025-11-20T19:00:00+07:00',
  '2025-11-20T21:00:00+07:00',
  'San khau Sinh vien UEH',
  '279 Nguyen Tri Phuong, Q10',
  'Ho Chi Minh',
  NULL,
  NULL,
  NULL,
  'Dem tong ket mua show 2025 voi nhieu tiet muc noi bat.',
  '/images/events/recap-night-2025.jpg',
  ARRAY['recap','acoustic']
)
ON CONFLICT DO NOTHING;

INSERT INTO members (id, name, role, bio_md, social_links, active) VALUES
(
  'c1a3f0ab-5d23-4db9-8a44-1a2b3c4d5e01',
  'Alice Tran',
  'Lead Guitar',
  'Guitarist voi 6 nam kinh nghiem, phu trach chuyen mon va dai dien CLB.',
  '{"instagram":"https://instagram.com/alice"}',
  true
),
(
  'd2b4e1bc-6e34-4eca-9b55-2b3c4d5e6f02',
  'Bob Nguyen',
  'Rhythm Guitar',
  'Phu trach tap luyen va phoi khi cho show thuong nien.',
  '{"facebook":"https://facebook.com/bob"}',
  true
)
ON CONFLICT DO NOTHING;

INSERT INTO event_performers (event_id, member_id, guest_name, role) VALUES
(
  '8a3f72c8-1b9a-4f3f-9e7d-0c2a0e2f0a11',
  'c1a3f0ab-5d23-4db9-8a44-1a2b3c4d5e01',
  NULL,
  'Lead Guitar'
),
(
  '8a3f72c8-1b9a-4f3f-9e7d-0c2a0e2f0a11',
  'd2b4e1bc-6e34-4eca-9b55-2b3c4d5e6f02',
  NULL,
  'Rhythm Guitar'
)
ON CONFLICT DO NOTHING;

INSERT INTO faq_structured (id, question, answer_md, category) VALUES
(
  'e3c5f2cd-7f45-4fdb-8c66-3c4d5e6f7a03',
  'CLB co tuyen thanh vien khong?',
  'CLB se mo don tuyen thanh vien vao dau hoc ky moi. Theo doi fanpage de nhan thong bao.',
  'tuyen_thanh_vien'
)
ON CONFLICT DO NOTHING;

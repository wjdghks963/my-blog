# 블로그 만들기

## 스택

Front : Next.js, TailwindCSS, Redux, Redux Tool Kit, NextAuth

Back : Next.js, Prisma

Devops : Vercel(front), PlanetScale(BD), CloudFlare(DNS, CDN, SSL)

## 만들 기능

- [x] 다크 모드

- [x] 메인 페이지

  - [x] 인기, 최신순 정렬, 카테고리 정렬
  - [x] 간단한 자기 소개, 프로젝트 소개

- [x] 인피니티 스크롤 블로그 글들 표시

  - [x] 태그들을 보여주고 그것을 클릭하면 해당하는 태그를 가진 포스트들만 인피니티
  - [x] 존재하는 태그들은 SSR을 통해 데이터 가져옴

- [x] 이력서

- [x] 포스트
  - [x] SSG로 구현하지만 프로젝트 내에는 데이터 X & fallback="blocking"을 통해 ISR로 구현
  - [x] Markdown을 예쁘게 표현하기 위해 라이브러리 사용

## 성능

- 홈

<img width="488" alt="스크린샷 2022-10-25 오후 5 32 13" src="https://user-images.githubusercontent.com/74060017/198501095-8607c153-1217-4ca0-839e-7ab13e191d68.png">

- 인피니티 스크롤이 있는 blogs

<img width="490" alt="스크린샷 2022-10-25 오후 5 33 31" src="https://user-images.githubusercontent.com/74060017/198501101-21bca8d2-1208-47ae-b443-95dee1795d9e.png">

- 이미지와 코드가 들어있는 post

<img width="835" alt="스크린샷 2022-10-25 오후 8 14 26" src="https://user-images.githubusercontent.com/74060017/198501113-58bcff29-2038-404c-8b50-29c54898d872.png">

접근성 까인 이유 :

- markdown을 사용하면서 header을 내 마음대로 사용하는데 이게 html의 시멘틱 규칙을 지기키 않았기 떄문에 감점
- code tag를 꾸며주는 라이브러리가 백그라운드와 포그라운드의 색상 대비율이 충분하지 않았기 떄문에 감점

## 반응형

- /

Iphone13 pro

![스크린샷 2022-10-28 오후 1 33 19](https://user-images.githubusercontent.com/74060017/198503290-9a000d8c-a9b2-4716-92d5-99aa9b2c1243.png)

DeskTop

![스크린샷 2022-10-28 오후 1 33 30](https://user-images.githubusercontent.com/74060017/198503287-3e1140f2-d72a-45b5-a9e8-1b038b4fc3e1.png)

- /blogs

Iphone13 pro

![스크린샷 2022-10-28 오후 1 34 06](https://user-images.githubusercontent.com/74060017/198503478-5a074fdc-2a41-4a8a-9f51-708a4a21df4f.png)

DeskTop

![스크린샷 2022-10-28 오후 1 33 57](https://user-images.githubusercontent.com/74060017/198503480-62f54a12-ccbf-4e96-bc2a-edf8073c441e.png)

- /blogs/post/[id]

Iphone13 pro

![스크린샷 2022-10-28 오후 3 00 48](https://user-images.githubusercontent.com/74060017/198514433-71a81012-091e-4a28-9c9e-9b07c01839d1.png)

DeskTop

![스크린샷 2022-10-28 오후 3 00 39](https://user-images.githubusercontent.com/74060017/198514443-01c089a2-5a65-4991-bbf4-2de4ea184382.png)

# 블로그 만들기

## StoryBook

[깃헙 링크](https://github.com/wjdghks963/my_blog_design_system)

[chromatic 링크](https://63635e18291535f4d01657be-csrykgcgxo.chromatic.com/?path=/story/components-base-headerli--normal)

## 스택

Front : Next.js, TailwindCSS, SWR, Redux, Redux Tool Kit, NextAuth

Next.js

장점

1. front와 back을 한번에 만들어서 배포 가능 -> Vercel을 이용하면 aws 인스턴스를 사용하지 않아도 되며 한 프로젝트 안에서 두 서버(font, back)를 올리고 관리가 가능함
2. 리액트를 이용하며 SSR의 이점을 챙길 수 있음 -> 정적 파일로 만들어 serving 가능, SEO 최적화 가능, bandwidth 줄임
3. 디렉토리로 route 설정 가능
4. 이미지나 컴포넌트에 대한 최적화 기능 제공 -> 이미지 자동 최적화(avif, webp)로 바꿔줌, 캐싱 등
5. rewrites, redirection을 설정 레벨에서 제공해줘 보안에도 장점을 가짐

단점

1. build 타임이 오래걸림


TailwindCSS

장점

1. css 문법이 적용되어 있는 문법을 사용해 간단하고 빠르게 스타일링 가능
2. css 파일을 줄여주고 적용되지 않는 스타일들을 자동적으로 없애줘 가벼움
3. 반응형에 최적화된 프레임워크 -> 모바일 친화적

단점

1. 상태에 의한 스타일링 동적 변경 약간 어려움
2. className이 너무 어려워지고 유지보수 약간 어려움
3. 런닝 커브가 존재했던 편


SWR

장점

1. 자동 통신 결과 캐싱과 전역적으로 사용가능
2. data, error 등 데이터 통신에 대한 결과를 바로 사용할 수 있는 훅 제공


Redux, Redux Tool Kit

장점

1. RTK를 사용하면서 리덕스가 가진 단점 중 하나인 보일러 플레이트를 확 줄일 수 있음
2. slice로 상태를 관리 저장하며 간단하게 사용할 수 있음 -> recoil과 비슷하거나 더 쉬움
3. extraReducer를 이용해 다른 상태(slice가 동작했는지)에 변경을 알 수 있고 특정 기능을 수행할 수 있음
4. 간단한 기능들만 사용해서 그런지 사용하기 쉬웠음



Back : Next.js, Prisma

Next.js

장점

1. express나 다른 백엔드 프레임워크와 같이 uri에 대한 요청이 들어오면 req, res를 구분해 준다. 

단점

1. back-end는 api만 만들어서 사용하기 때문에 복잡한 비지니스 로직을 만들기 어려움
2. 미들웨어 적용 어려움
3. 한 파일 내에서 GET, POST 같은 http 요청이 들어온다면 분기 처리를 해야함


Prisma

장점

1. SQL 문을 사용하지 않고 쉽게 데이터 추출이 가능하고 다양한 기능을 제공함 (contains, where ... )
2. Schema를 작성할 때 다대다에 대한 테이블을 따로 생성하지 않아도 임시 테이블을 자동적으로 만들어줘 사용이 가능하다.
3. index를 지원한다.
4. prisma studio로 테이블 스키마, 어떤 데이터가 저장되어 있는지 등 확인이 가능하고 수정 추가 제거도 가능하다.


Devops : Vercel(front), PlanetScale(BD), CloudFlare(DNS, CDN, SSL)


Vercel : CI/CD 제공, 배포

PlanetScale : MySQL 기반 서버리스 데이터 베이스 & branch 기능 제공

CloudFlare : DNS, CDN, SSL 및 JS 파일 축소 등 다양하고 product에 효과적인 기능과 admin 패널(트래픽, 캐싱 퍼센트, 고유 방문자 ) 제공


## 만들 기능

- [x] 다크 모드

- [x] 메인 페이지

  - [x] 인기, 최신순 정렬, 카테고리 정렬
  - [x] 간단한 자기 소개, 프로젝트 소개

- [x] 인피니티 스크롤 블로그 글들 표시

  - [x] 태그들을 보여주고 그것을 클릭하면 해당하는 태그를 가진 포스트들만 인피니티
  - [x] 존재하는 태그들은 SSR을 통해 데이터 가져옴
  - [x] 연관 검색어로 검색 기능

- [x] 이력서

- [x] 포스트
  - [x] SSG로 구현하지만 프로젝트 내에는 데이터 X & fallback="blocking"을 통해 ISR로 구현
  - [x] Markdown을 예쁘게 표현하기 위해 라이브러리 사용

## Architecture 

![Architecture of my_blog](https://user-images.githubusercontent.com/74060017/215678005-1f71a67a-8628-4338-8dbb-48a3d6228395.png)

## 성능

- 홈

<img width="488" alt="스크린샷 2022-10-25 오후 5 32 13" src="https://user-images.githubusercontent.com/74060017/198501095-8607c153-1217-4ca0-839e-7ab13e191d68.png">

- 인피니티 스크롤이 있는 blogs

<img width="490" alt="스크린샷 2022-10-25 오후 5 33 31" src="https://user-images.githubusercontent.com/74060017/198501101-21bca8d2-1208-47ae-b443-95dee1795d9e.png">

![스크린샷 2022-11-07 오후 4 30 50](https://user-images.githubusercontent.com/74060017/200260970-072bd6c7-b8d1-4937-af53-28458113db47.png)

- 이미지와 코드가 들어있는 post

<img width="835" alt="스크린샷 2022-10-25 오후 8 14 26" src="https://user-images.githubusercontent.com/74060017/198501113-58bcff29-2038-404c-8b50-29c54898d872.png">

![스크린샷 2022-11-07 오후 4 42 09](https://user-images.githubusercontent.com/74060017/200260973-f7e63ddb-2b93-4640-b1fd-295636c7a666.png)

접근성 까인 이유 :

- markdown을 사용하면서 header을 내 마음대로 사용하는데 이게 html의 시멘틱 규칙을 지키지 않았기 떄문에 감점
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

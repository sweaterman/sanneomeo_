<div align=center>

<img width="80%" src="./img/overmountain.png">
<br/>
<br/>

# 서비스 소개

<br/>
‘산너머’는 등산을 하고 싶은 사용자에게 맞춤형 등산로 정보를 제공하는 서비스입니다.
<br/>
산너머와 함께, 건강한 등산 라이프를 즐겨봐요!
<br/>
<br/>

['산너머' 소개영상 바로가기](https://youtu.be/xhqs7YYi4vc)

<br/>
<br/>
<br/>

# 프로젝트 소개

<br/>
SSAFY 8기 특화 프로젝트 우수상 🏆
<br/>
개발 기간: 2023/02/20 ~ 2023/04/07 (7주)
<br/>
<br/>
김소정(PM, BE) 이연희(FE) 류제엽(FE) 
<br/>
오의석(BE, CI/CD) 윤수희(BE) 김지현(BE)

<br/>
<br/>
<br/>

# 기술 스택

<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=Elasticsearch&logoColor=white">
<img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white">
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">

<br/>
<br/>
<br/>

# 아키텍쳐

<br/>
<img width="50%" src="./img/Service_Architecture.png">

<br/>
<br/>
<br/>

# 프로젝트 특징

<br/>

`🚩 (1) 산너머만의 등산로 리스트 추출 프로그램 제작`

<br/>
<img width="50%" src="./img/rail_program.png">

산림청 API에서 받아온 끊어져 있는 등산 경로 데이터를 연결하기 위해
<br/>
카카오 지도 api를 활용하여 **등산 경로를 시각화**하고<br/>
클릭하여 연결하면 **sql문을 생성**하는 프로그램을 추가 구현하여 사용했습니다.

[경로 추출 프로그램 자세히 보기](/data/Create-Course-Program/README.md)

<br/>
<br/>

`🚩 (2) 카카오 지도 API를 활용한 등산로 경로/고도 시각화`

 <br/>
 <img width="50%" src="./img/feature2.png">

 카카오 지도 API를 활용하여 해당하는 등산로의 경로 데이터를 보여주고, <br/>
 해당하는 등산로의 고도 정보를 Chart.js를 사용하여 시각화하였습니다.

 <br/>
 <br/>

 `🚩 (3) 추천 알고리즘`

<br/>
<img width="80%" src="./img/feature3.png">

설문조사에를 작성하면 정보를 바탕으로 하나의 타겟 등산로를 필터링합니다. <br/>
이후 컨텐츠 기반 필터링을 통해 유사한 등산로를 추출하고, 사용자에게 제공합니다. <br/>

협업 필터링은 사용자들의 후기와 찜 작성 행위를 기반으로 유사도를 계산하고, <br/>
유사한 사용자의 관심사를 사용자에게 반영합니다.


<br/>
<br/>
<br/>

# 주요 화면

|        |        |
| ------ | ------ |
|    <img src="./img/main.png">     |    <img src="./img/like_list.png">     |
|    <div align=center> `메인 화면` </div>    |    <div align=center> `찜리스트` </div>    |
|    <img src="./img/mountain_detail1.png">    |    <img src="./img/mountain_detail2.png">    |
|    <div align=center> `산 상세 페이지 1` </div>    |    <div align=center> `산 상세 페이지 2` </div>    |
|    <img src="./img/recommend_question.png">    |    <img src="./img/recommend_result.png">    |
|    <div align=center> `추천 설문 페이지` </div>    |    <div align=center> `추천 결과` </div>    |
|    <img src="./img/spot_page.png">    |    <img src="./img/hundread.png">    |
|    <div align=center> `등산로 스팟 페이지` </div>    |    <div align=center> `100대 명산` </div>    |

<br/>
<br/>
<br/>

# ERD 다이어그램

<br/>

<img width="80%" src="./img/erd_diagram.png">


</div>

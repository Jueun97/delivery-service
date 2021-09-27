# *delivery-service*
## 프로젝트 소개

 
## 사용 기술
### 1. Front-end

|<img src="/readme/logo/html.png" width="150">|<img src="/readme/logo/css.png" width="150">|<img src="/readme/logo/js.png" width="150">|<img src="/readme/logo/react-native.png" width="150">|
|:---: |:---: |:---:|:---:|
|HTML|PostCSS|Javascript|React Native|


### 2. Back-end
|<img src="/readme/logo/node.png" width="150" height="150">|<img src="/readme/logo/express.png" width="150" height="150">|<img src="/readme/logo/mysql.png" width="150" height="150">|
|:---:|:--:|:--:|
|Node.js|Express|MySQL|

<br>

## 주요 기능
### <사용자모드>
### 1. 배송 예약현황 확인 기능
### 2. 큐알코드 스캔 기능
- 배송 예약 시 큐알코드를 통해 인증
### 3. 배송 예약 / 수정 / 취소 기능
### 4. 예약한 배송 리스트 / 배송 현황 확인 기능
### 5. 현재 배송 위치 추적 기능

### <관리자모드>
### 1. 배송 예약현황 확인 기능
### 2. 배송상태 변경 기능 
- 배송준비중 - 배송중 - 배송완료 / 배송취소
### 3. 예약된 배송 리스트 확인 기능
### 4. 예약한 사용자 정보 확인 기능
<br>

## 미리보기 
### 1. 사용자모드
#### 1.1 배송 예약 과정
|메인화면|예약현황 확인 |큐알코드 스캔|
|:---:|:--:|:--:|
|<img src="/readme/images/main.jpg" height="300">|<img src="/readme/images/bookingState.jpg"  height="300">|<img src="/readme/images/qrCode.jpg"  height="300">|
>- 메인화면에서 Booking 클릭 시 사용자모드로 전환
>- 얘약 현황 페이지에서 예약 할 배송지 클릭 시 큐알코드 스캔 페이지로 이동

|예약 페이지|예약 정보 확인 |
|:---:|:--:|
|<img src="/readme/images/booking.jpg" height="300">|<img src="/readme/images/checkBooking.jpg"  height="300">|
>- 큐알코드 인증 성공 시 예약 페이지로 이동
>- 예약 완료 후 예약 정보 확인 가능

#### 1.2 예약 정보 확인
|마이페이지 접속|예약 리스트 확인 |예약 정보 확인 및 수정 / 삭제|배송 위치 추적|
|:---:|:--:|:---:|:--:|
|<img src="/readme/images/userPassword.jpg" height="300">|<img src="/readme/images/userBookingList.jpg"  height="300">|<img src="/readme/images/userDetails.jpg"  height="300">|<img src="/readme/images/map.jpg"  height="300">|
>- 헤더의 오른쪽 아이콘 (유저 아이콘) 클릭 시 마이페이지로 이동
>- 마이페이지에서 본인이 예약한 배송의 배송현황 및 배송상태 확인 가능
>- 예약 리스트에서 원하는 예약 정보 클릭 시 예약 상세 정보 확인 가능
>- 예약 상세 정보 페이지에서 예약 수정 및 삭제 가능
>- 예약 리스트에서 배송현황 아이콘 클릭 시 배송 위치 추적 가능 (배송중일때)

### 3. 관리자모드
|메인화면|관리자코드 입력 |
|:---:|:--:|
|<img src="/readme/images/main.jpg" height="300">|<img src="/readme/images/adminPassword.png"  height="300">|

>- 메인페이지에서 *Admin* 클릭 시 관리자코드 입력 페이지로 이동
>- 이미 등록된 관리자코드 입력 시 관리자모드로 접속 가능

|예약 현황| 예약된 배송 리스트 | 배송 상세 정보|
|:---:|:--:|:--:|
|<img src="/readme/images/adminBookingState.png" height="300">|<img src="/readme/images/adminBookingList.png"  height="300">|<img src="/readme/images/adminDetails.png"  height="300">|

> - 예약 현황에서 원하는 목적지 선택 시 해당 목적지 배송 정보 리스트 페이지로 이동
> - 예약자 리스트 페이지에서 배송상태 변경 가능 ( 배송완료 / 배송취소 )
> - 배송상태 변경 시 사용자에게 알림메시지 전송

#### 3.1 예약 상태 변경
|배송상태 변경| 알림메시지 전송 | 배송상태정보 변경|
|:---:|:--:|:--:|
|<img src="/readme/images/notification1.png" height="300">|<img src="/readme/images/notification2.png"  height="300">|<img src="/readme/images/notification3.png"  height="300">|

>- 얘약된 배송 리스트에서 배송 상태 변경
>- 배송 상태 변경 시 해당 사용자에게 알림메시지 전송
>- 해당 사용자의 마이페이지에서 변경된 배송 상태 확인 가능

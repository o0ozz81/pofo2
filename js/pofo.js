(($)=>{
  //console.log($);
class Pofo{ //클래스 -  파스칼 케이스 기법
  init(){
    this.header();
    this.section1();
    this.section2();
    this.section3();
    this.section4();
    this.section5();
    this.section6();
    this.section7();
    this.section8();
    this.section9();
    this.section10();
    this.quick();
    this.goTop();
  }
  header(){
    let t = false;  // 테블릿 모바일
    let t2 = false; // pc

    //모바일 메뉴 버튼 이벤트
    $('.mobile-btn').on({
        click: function(){
            $(this).toggleClass('on');
            $('#nav').stop().slideToggle(300);
        }
    });


    //기본값 
    $('.sub').stop().slideUp(0); 

    //반응형 
    $(window).resize(function(){ //창크기가 변경 될 때만 실행2
      resizeNav();            
    });
    
    //반응형 네비게이션 
    function resizeNav(){
        if( $(window).width()<=1024 ){
              $('.mobile-btn').removeClass('on');
              $('#nav').stop().hide();
              t2=false; //데스크탑  토글 초기화
              if(t===false){
                t=true;
                // 마우스 오버 이벤트 삭제
                $('.sub').stop().fadeOut(0);
                $('.main-btn').off('mouseenter');   
                $('.main-btn').bind({
                    click: function(event){
                      $(this).next().stop().slideToggle(300); 
                    }
                });
              }
        }
        else {
            $('.mobile-btn').removeClass('on');
            $('#nav').stop().show();
            t=false; //모바일  토글 초기화
            if(t2===false){                 
               t2=true;
              // 마우스 오버 이벤트 삭제
              $('.main-btn').off('click');
              $('.main-btn').on('mouseenter');
              $('.sub').stop().slideUp(0); 

              $('.main-btn').on({
                  mouseenter: function(){
                    $('.sub').fadeOut(0); 
                    $(this).next().fadeIn(300); 
                  }
              });

              $('#nav').on({
                  mouseleave: function(){
                    $('.sub').fadeOut(300); 
                  }
              });

              //서브서브메뉴      
              $('.sub-btn').on({
                  mouseenter: function(){
                    $('.sub-sub').fadeOut(0); 
                    $(this).next().fadeIn(300); 
                  }
              });
              $('.col24').on({
                  mouseleave: function(){
                    $('.sub-sub').fadeOut(300); 
                  }
              });
            }
        }
    }

    resizeNav(); //로딩시 실행1

        //1024이하인 해상도  - 메인메뉴 마우스 클릭 Mobile(모바일)



        //1024초과인 해상도 - 메인메뉴 마우스 오버 PC(데스크 탑) //////////////////////////
        
    // $(window).resize(); //크기 높이 너비 변화가되면 실행
    // 스크롤 이벤트 : 반드시 스크롤이 발생해야만 실행된다.
    // 패럴럭스
    // $(window).scroll(function(){        
    // });




    let result = ''; // UP  DOWN 
    let newTop = $(window).scrollTop(); //현재(새로운) 위치 스크롤 탑값
    let oldTop = newTop;                //이전(올드) 스크롤 탑값 위치

    $(window).scroll(()=>{

        // console.log( $(window).scrollTop() );  //상하 스크롤 탑값
        // console.log( $(window).scrollLeft() ); //좌우 스크롤 탑값
        // console.log( $(window).height() ); //창높이
        // console.log( $(window).width() ); //창너비
        // console.log( $(document).height() ); //웹문서의 전체 길이(높이)
        // console.log( $(document).width() ); //웹문서의 너비

        // 스크롤이 아래로 발생하면 : 스크롤 다운(scrollDown)
        // 스크롤이   위로 발생하면 : 스크롤 업(scrollUp)
        newTop = $(window).scrollTop(); //현재(새로운) 위치 스크롤 탑값
            
          //  200-290(-90) > 0 ? 'UP' : 'DOWN' //- 음수 발생하면 스크롤다운
          //  300-290(10) > 0 ? 'UP' : 'DOWN'  //+ 양수 발생하면 스크롤업
          result = oldTop-newTop > 0 ? 'UP' : 'DOWN'; //업 다운 결정 결과 리턴
          // upDown = newTop-oldTop > 0 ? 'DOWN' : 'UP';
          
          // console.log( result );

          if(result==='UP')  {   //네비게이션 보이기
            $('#header').removeClass('hide');
            $('#header').addClass('show');              
          }

          if(result==='DOWN'){   //네비게이션 감추기
            $('#header').removeClass('show'); 
            $('#header').addClass('hide');
          }

          if($(window).scrollTop()===0){ //맨위로 올라가면
            $('#header').removeClass('show'); 
          }

        oldTop = newTop;                //이전(올드) 스크롤 탑값 위치

    });
    




   
  }
  section1(){
    let cnt=0;
    let n = $('#section1 .slide').length-3; //5-3=2  //length 길이(갯수) 괄호 사용 안함.
    let setId = 0; //타이머 변수
    let setId2 = null;
        // 터치 스와이프 
    //4. 좌우 방향에 따라 다음슬라이드 또는 이전슬라이드 결정
    //   마우스 터치 시작점(마우스다운) 그리고 터치 끝점(마우스업)을 알아야 방향 결정
    let touchStart = null;
    let touchEnd = null;
    let result = '';
    //마우스가 반드시 다운하고 시작한다.
    let dragStart = null;
    let dragEnd = null;
    let mouseDown = false; //논리변수 true(마우스다운상태),false(마우스다운안한상태)

    //슬라이드 너비 ★반응형★ 구하기
    //너비와 높이가 단1픽셀이라도 변경되면 동작한다.
    //크기변경이 없으면 절대 동작하지 않는다.
    let winW = $(window).width(); //초기값 구한 창너비

      $(window).resize(function(){ //창 크기를 조절했을때 반응하는 값
        winW = $(window).width();
        //console.log('창너비' , winW);
        mainSlide();
        return winW;  //반응형 창너비(데스크탑,태블릿,노트북,모바일)
      });

      //1. 메인슬라이드함수
      function mainSlide(){
        //console.log(winW);//지금내가 돌리는 창 너비 얼마니?
        //console.log(-winW*cnt);
          $('#section1 .slide-wrap').stop().animate({left:-winW*cnt}, 600,'easeInOutExpo',function(){
            cnt>n?cnt=0:cnt;
            cnt<0?cnt=n:cnt;
            $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
          });
      }
      //2-1. 다음(Next)카운트함수
      function nextCount(){
        cnt++;
        mainSlide();
      }        
      //2-2. 이전(Preview)카운트함수
      function prevCount(){
        cnt--;
        mainSlide();
      }

      //3. 자동타이머함수
      function autoTimer(){
        setId = setInterval(nextCount, 3000);
        //console.log(setId);
      }
      autoTimer();

      //타이머중지 함수
      function timerfn(){
        let tCnt = 0;
        clearInterval(setId); //자동 타이머 중지
        clearInterval(setId2); //자동 타이머 중지
        setId2 = setInterval(function(){ //다시초기화
          tCnt++;
          //console.log(tCnt);
          if(tCnt>=3){
            clearInterval(setId);
            clearInterval(setId2); //카운트 이제 그만 그리고 자동타이머 실행
            autoTimer(); //자동타이머 3초 후에 실행됨! 총 6초후 실행 setId = setInterval(nextCount, 3000);
          }
        },1000);
      }

    //console.log('창너비' , winW);
    //console.log(`0-$('.slide-wrap').offset().left-1903`,0-$('.slide-wrap').offset().left-winW);
        // 터치 스와이프 : /////////////////////////////////////////////////////////
        // 4. 좌우 방향에 따라 다음슬라이드 또는 이전슬라이드 결정
        //   마우스 터치 시작점(마우스다운) 그리고 터치 끝점(마우스업)을 알아야 방향 결정
        $('#section1 .slide-container').on({
        mousedown: function(event){ //이벤트 //touchstart
          timerfn();//중지되고 난 후 5초간 아무 터치가 없으면 다시 슬라이드 움직임
          //console.log(setId);
          touchStart = event.clientX;
          //drag 
          dragStart = event.clientX-$('#section1 .slide-wrap').offset().left-winW;
          //  console.log( `event.clientX`, event.clientX );
          // console.log(`$('.slide-wrap').offset().left-1903`,  $('.slide-wrap').offset().left-1903 ); //반드시 
          //console.log(  dragStart );
          mouseDown = true;
        },
         mouseup: function(event){ //이벤트
          touchEnd = event.clientX;
          result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
              if(!$('#section1 .slide-wrap').is(':animated') ){
                nextCount(); //다음슬라이드 호출
              }
          }
          if(result==='PREV'){
            if(!$('#section1 .slide-wrap').is(':animated') ){
              prevCount(); //다음슬라이드 호출
            }

          }
          //드래그 앤 드롭 끝나는 점 
          mouseDown = false;

        },
        mouseleave: function(event){ //이벤트
          if(!mouseDown){ //마우스 다운이 아니면 강제종료
            return;
          }
          touchEnd = event.clientX;
          result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
          if(result==='NEXT'){
            if(!$('#section1 .slide-wrap').is(':animated') ){
              nextCount(); //다음슬라이드 호출
            }
        }
        if(result==='PREV'){
          if(!$('#section1 .slide-wrap').is(':animated') ){
            prevCount(); //다음슬라이드 호출
          }

        }
          //드래그 앤 드롭 끝나는 점 
          mouseDown = false;
        },  
        mousemove: function(event){//마우스 방향에 따라 따라다니는 것 : 마우스 무브
          if(!mouseDown){ //마우스 다운이 아니면 강제종료
            return;
          }
          dragEnd = event.clientX;
          //console.log(dragEnd-dragStart); //드래그한 길이가 나온다.
          $('#section1 .slide-wrap').css({left: dragEnd-dragStart}); //드래그 앤 드롭 끝남
        }
    });

    //모바일 전용 핑거(손가락) 터치 이벤트
    $('#section1 .slide-container').on({
      touchstart: function(event){ //mousedown
        timerfn();//중지되고 난 후 5초간 아무 터치가 없으면 다시 슬라이드 움직임
        //console.log('핑거 터치이벤트:', event);
        touchStart = event.originalEvent.changedTouches[0].clientX; //0:touch니까 배열[0]
        dragStart = event.originalEvent.changedTouches[0].clientX-$('#section1 .slide-wrap').offset().left-winW;
        mouseDown = true;
      },
      touchend: function(event){ //mouseup
        touchEnd = event.originalEvent.changedTouches[0].clientX;
        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
        if(result==='NEXT'){
            if(!$('#section1 .slide-wrap').is(':animated') ){
              nextCount(); //다음슬라이드 호출
            }
        }
        if(result==='PREV'){
          if(!$('#section1 .slide-wrap').is(':animated') ){
            prevCount(); //다음슬라이드 호출
          }
        }
      },
      touchmove : function(event){
        if(!mouseDown){ //마우스 다운이 아니면 강제종료
          return;
        }
        dragEnd = event.originalEvent.changedTouches[0].clientX;
        $('#section1 .slide-wrap').css({left: dragEnd-dragStart}); //드래그 앤 드롭 끝남
      }
    });
  }
  section2(){
    //스크롤 이벤트 
    //섹션2번이 노출되면 패럴럭스 구현 추가 클래스 sec2Ani
    const sec2Top = $('#section2').offset().top-$(window).height(); //969,967정도 나옴 빼주면 섹셕1아래 0이 됨 
/*       console.log(`$(window).header()`, $(window).height()); //창높이
      console.log(`$('#section2').offset().top` ,$('#section2').offset().top); //섹션2
      console.log(`sec2Top`,sec2Top); */
      $(window).scroll(function(){
          if($(window).scrollTop()>sec2Top){
            $('#section2').addClass('sec2Ani');
            return; //스크롤 탑값 계속 진행하는 걸 종료
          }
          if($(window).scrollTop===0){
            $('#section2').removeClass('sec2Ani');
            return;
          }
      });
  }
  section3(){
    
    //1.섹션의 탑값 
    //2.스크롤 이벤트
    let sec3Top = $('#section3').offset().top-$(window).height();

      $(window).scroll( ()=> {
        if($(window).scrollTop() > sec3Top){
          $('#section3').addClass('sec3Ani');
          return; //스크롤 탑값 계속 진행하는 걸 종료
        }
        if($(window).scrollTop===0){
          $('#section3').removeClass('sec3Ani');
          return;
        }
      });
  }
  section4(){      
    let idx = 0;
    
    let winW = $(window).width();
    let cols = 4; //해상도 크기별 조건문 4 3 2 1
    let imgW = winW/cols;
    let imgH = imgW*0.8125;

    let n = $('#section4 .gallery-list').length;
    let h = $('#section4 .gallery-list.hide').length;
    let rows = Math.ceil((n-h)/cols);
    
    //섹션4의탐값-창높이
    let sec4Top = $('#section4').offset().top-$(window).height();
    let scr = false;  //토글 변수 한번은 true 또한번은 false;
    const galleryList = $('#section4 .gallery-list');

        //스크롤 이벤트 : Parallax
        //스크롤이 발생해야 구현한다.
        $(window).scroll(function(){

          //스크롤 탑값이 맨위에 도달하면 탑값이 0이면 클래스 초기화(삭제)
          if($(window).scrollTop() === 0 ){
              //섹션4에 클래스 추가하기
              scr=false;  //초기화
              $('#section4').removeClass('sec4Ani');
          }
          //섹션4 스크롤탑값 이상이면 계속 진행 포에버  
          //          
          if($(window).scrollTop() >= sec4Top ){
              if(scr===false){
                  scr=true; //애니메이션 1회만 진행했다.
                  $('#section4').addClass('sec4Ani');
              }
          }

        });
        setTimeout(galleryMain, 100);

        //반응형 윈도우 리사이즈 크기가 변경되면 구현된다.
        $(window).resize(function(){              
            galleryMain();
        });

        $('#section4 .gallery-btn').each(function(index){
            $(this).on({
              click: function(e){
                e.preventDefault();
                idx = index; //클릭한 인덱스 번호
                galleryMain();
                $('#section4 .gallery-btn').removeClass('on');
                $(this).addClass('on');
                $('#section4').removeClass('sec4Ani');
              }           
            });
        });

        // 갤러리 이미지 재배치 함수
        function galleryMain(){

          winW = $(window).width();
          if(winW>=1280){
              cols = 4;
          }
          else if(winW>=1024){ //1024~1279
              cols = 3;
          }
          else if(winW>=600){ //600~1023
              cols = 2;
          }
          else { //320~599
              cols = 1;
          }
          imgW = winW/cols;
          imgH = imgW*0.8125;

          galleryList.removeClass('zoomin'); //줌 효과 삭제 초기화
          galleryList.stop().animate({width:imgW,height:imgH}).removeClass('hide'); //초기화
          $('.gallery-list .img-wrap').css({width:imgW});

          if(idx===0){     //8개 보이기(show)
              switch(cols){
                case 4: //칸
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
      
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);
                    break;
                case 3:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                    galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);      
                    galleryList.eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);

                    galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                    break;
                case 2:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
      
                    galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
      
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
      
                    galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);                    
                    break;
                default : //else 1칸
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);
              }
          }
          else if(idx===1){ //3개 보이기 / 5 숨기기 재배치

            galleryList.eq(0).hide().addClass('hide');
            galleryList.eq(2).hide().addClass('hide');
            galleryList.eq(3).hide().addClass('hide');
            galleryList.eq(4).hide().addClass('hide');
            galleryList.eq(6).hide().addClass('hide');

            switch(cols){
              case 4:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  break;
              case 3:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  break;
              case 2:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  break;
              default:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
            }  


          }
          else if(idx===2){ //6개 보이기 3, 7 숨기기

            galleryList.eq(3).hide().addClass('hide');
            galleryList.eq(7).hide().addClass('hide');
            
            switch(cols){
              case 4:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           
                  galleryList.eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
    
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  break;
              case 3:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           

                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  galleryList.eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                  break;
              case 2:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                  galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);           
                  galleryList.eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  galleryList.eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                  break;
              default:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);           
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                  galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
            }  

          }
          else if(idx===3){ //4개

            galleryList.eq(1).hide().addClass('hide');
            galleryList.eq(3).hide().addClass('hide');
            galleryList.eq(6).hide().addClass('hide');
            galleryList.eq(7).hide().addClass('hide');
            
            switch(cols){
              case 4:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                  galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                  break;
              case 3:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                  galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  break;
              case 2:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  break;
              default:
                  galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);            
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
            }  

          }
          else if(idx===4){ //2개

            galleryList.eq(0).hide().addClass('hide');
            galleryList.eq(1).hide().addClass('hide');
            galleryList.eq(2).hide().addClass('hide');
            galleryList.eq(3).hide().addClass('hide');
            galleryList.eq(5).hide().addClass('hide');
            galleryList.eq(6).hide().addClass('hide');

            
            switch(cols){
              case 4:
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  break;
              case 3:
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  break;
              case 2:
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  break;
              default:
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
            }  

          }
          else if(idx===5){ //5개

            galleryList.eq(0).hide().addClass('hide');
            galleryList.eq(2).hide().addClass('hide');
            galleryList.eq(6).hide().addClass('hide');
            
            switch(cols){
              case 4:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
    
                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  break;
              case 3:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                  galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                  break;
              case 2:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  break;
              default:
                  galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                  galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                  galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
            }  

          }

          // hide 클래가 몇개니?
          h = $('#section4 .gallery-list.hide').length;
          rows = Math.ceil((n-h)/cols);     //줄수는 hide  갯수를 가져온뒤에 높이를 정한다. 
          $('#section4 .galley-wrap').stop().animate({height: imgH*rows }, 300); //갤러리 전체 박스높이

          //줌 효과
          galleryList.addClass('zoomin');

        }  //갤러리 함수

  }
  section5(){
    let sec5Top = $('#section5').offset().top-$(window).height();
    let t = false; //토글 toggel 한번은 false , 또 한번은 true;

    $(window).scroll( ()=> {
      if($(window).scrollTop()===0){
        t=false;
        $('#section5').removeClass('sec5Ani');
      }
      if($(window).scrollTop() > sec5Top){
        if(t===false){
          t=true;
          $('#section5').addClass('sec5Ani');
          //SVG 애니메이션 실행
          //함수 호출 실행
          svgAnimation();
        }
      }
    });

    //SVG 애니메이션
    //1. SVG 원형 총(Total) 길이(Length)를 구한다.(가져오기get) 갯 토탈 랭스
    //getTotalLenght(); //함수(메소드) SVG원형 객체의 총 길이를 px 단위로 구한다.
    //원형박스 선택자 자식요소 circle 그래픽 디자인 요소
    function svgAnimation(){
      const svgObj  = $('#section5 .ring-front circle');
      let svgArr = []; //원형 svg배열
      let perSize = []
      let piece = [] //1마디 총4개(배열이라서)
      let per = [.9, .75, .9, .62];
      let secound = 3; //원래 3초임. 지금은 10초
      let sum = [0,0,0,0];
      let setId = [0,0,0,0];
    
      $.each(svgObj, function(idx, obj){ //선택자 : svgObj. 원형 4개 반복처리
        //console.log(idx, obj); //0 원형요소
        //console.log(idx, obj, obj.getTotalLength()); //0 원형요소
          //1.총 길이
          svgArr[idx] = obj.getTotalLength(); //4개가 배열에 저장
          //2. 각 요소의 전체길이 대입 : 초기설정
          //obj.style.stroke-dasharray
          //2.순수자바스크립트
  /*         obj.style.strokeDasharray = svgArr[idx];
          obj.style.strokeDashoffset = svgArr[idx]; */
  
          //2-1.제이쿼리
          $(obj).css({strokeDasharray : svgArr[idx]});
          $(obj).css({strokeDashoffset : svgArr[idx]});
          //3.각 요소의 퍼센트 길이를 구해야한다.
          //퍼센트배열변수필요 
          perSize[idx] = svgArr[idx] * per[idx]; 
        /*  perSize[0] = 461.0681457519531 * .9;
          perSize[1] = svgArr[1] * .75;
          perSize[2] = svgArr[2] * .9;
          perSize[3] = svgArr[3] * .62; */
          //4. 각 요소의 한 마디의 길이를 구한다.똑딱 한번에 이동할 수 있는 마디의 길이가 있어야 애니메이션 구현이 됨
          //마디의배열변수필요.(let piece)
          piece[idx] =  (perSize[idx]/secound)/100; //1초를 100으로 나눔.빨리 진행됨 앞에꺼 먼저 나누고 나중에 계산.
  
          //5.마디를 카운트 타이머이용 
          function sumfn(){
            sum[idx] += piece[idx]
            if(sum[idx] > perSize[idx]){
              clearInterval(setId[idx]);
            }
            else{
              $(obj).css({strokeDashoffset:svgArr[idx] - sum[idx]}); //1-0.9
              $('.count-num').eq(idx).html(Math.ceil(sum[idx]/svgArr[idx]*100) + '%' );
            }
          }
  
  /*         //6.애니메이션 구현
          //$(obj).css({strokeDashoffset:총길이 - 퍼센트누적 > 1-0.9 > svgArr[idx] - piece[idx] 다 더하면 perSize[idx]이게나옴  })
          $(obj).css({strokeDashoffset:svgArr[idx] - perSize[idx]*100 }) */
  /*           console.log('총길이', svgArr[idx]);
            console.log('퍼센트 길이', perSize[idx]);
            console.log('1마디의 길이', piece[idx]);  */
  
          //7.타이머 설정
          //setInterval(마디카운트함수 5번6번함수 묶어서 하나로만들어줘야함, 10);
          setId[idx] = setInterval(sumfn, 10); //이 타이머가 애니메이션을 구현함 0으로 하면 4번에  1000으로 나눔 느려짐 . piece[idx]=(perSize[idx]/secound)/1000; 
      });
  
    }



/*     console.log(svgArr);  //배열 목록 출력
    console.log(0,svgArr[0]);  //0배열 목록 출력
    console.log(1,svgArr[1]);  //1배열 목록 출력
    console.log(2,svgArr[2]);  //2배열 목록 출력
    console.log(3,svgArr[3]);  //3배열 목록 출력 */

/*     console.log('[0]총길이',svgArr[0]);
    console.log('[0]퍼센트 길이',perSize[0]);
    console.log('[0]1마디의 길이',piece[0]); */










  }
  section6(){
    //패럴럭스 
    let sec6Top = $('#section6').offset().top-$(window).height();
    let t = false;

    $(window).scroll( ()=> {
      if($(window).scrollTop()===0){
        t = false;
        $('#section6').removeClass('sec6Ani');
      }
      if($(window).scrollTop() > sec6Top){
        if(t === false){
          t = true;
          $('#section6').addClass('sec6Ani');
        }
      }
    });
  }
  section7(){
    //페럴럭스 
    let winH = $(window).height();
    let sec7Top = $('#section7').offset().top-winH;
    let t = false;

    $(window).scroll( ()=> {
      if($(window).scrollTop()===0){
        t = false;
        $('#section7').removeClass('sec7Ani');
      }
      if($(window).scrollTop() > sec7Top){
        if(t=== false){
          t = true;
          $('#section7').addClass('sec7Ani');
        }
      }
    })

  }
  section8(){
    //패럴럭스 
    let sec8Top = $('#section8').offset().top-$(window).height();
    let t = false;

    $(window).scroll( ()=> {
      if($(window).scrollTop()===0){
        t = false;
        $('#section8').removeClass('sec8Ani');
      }
      if($(window).scrollTop() > sec8Top){
        if(t === false){
          t = true;
          $('#section8').addClass('sec8Ani');
        }
      }
    });
  }
  section9(){
    //페럴럭스 
    let winH = $(window).height();
    let sec9Top = $('#section9').offset().top-winH;
    let t = false;

    $(window).scroll( ()=> {
      if($(window).scrollTop()===0){
        t = false;
        $('#section9').removeClass('sec9Ani');
      }
      if($(window).scrollTop() > sec9Top){
        if(t=== false){
          t = true;
          $('#section9').addClass('sec9Ani')
        }
      }
    })
  }
  section10(){

  }

  quick(){
    let quickTop = ($(window).height()-$('#quickBox').height())/2-100;
    $(window).scroll(function(){
      $('#quickBox').stop().animate({top:quickTop+$(window).scrollTop()},600,'easeOutExpo');
    });
  }

  goTop(){
    //위에서 스크롤이 발생하면 보이게 이벤트
    $(window).scroll(function(){
      if( $(window).scrollTop()>100){
        $('#goTopBox').stop().fadeIn(1000);
      }
      else{
        $('#goTopBox').stop().fadeOut(1000);
      }
    });
    //맨위로 부드럽게 이동 : 스무스 스크롤링
    $('.gotop-btn').on({
      click: function(){
        $('html,body').stop().animate({scrollTop:0},600);
      }
    });
  }
}
const newPofo = new Pofo();
newPofo.init();




})(jQuery);
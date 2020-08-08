
//전역변수에 선언하지 않기 위해 즉시실행 함수 안에 선언 
(()=>{
	const sceneInfo = [
		{
			scrollHeight:0, //창 사이즈에 따라 js 에서 설정
			heightNum : 5 , //브라우처 높이의 5배로 scrollHeight 설정
			type:'sticky',
			objs :{ //각 section
				container : document.querySelector('#scroll-section-0'),
				messageA : document.querySelector('#scroll-section-0 .main-message.a'),
				messageB : document.querySelector('#scroll-section-0 .main-message.b'),
				messageC : document.querySelector('#scroll-section-0 .main-message.c'),
				messageD : document.querySelector('#scroll-section-0 .main-message.d'),
			},
			value : { //opacity, y값 (translate)
				messageA_opacity_in : [0,1, {start: 0.1 , end: 0.2}], //{start: 나타나고 end:opacity 가 완전 1이되는 시점}
				messageA_opacity_out : [1,0, {start: 0.25 , end: 0.3}], //{start: 나타나고 end:없어지는 시점}
				messageA_translateY_in : [20,0,{start: 0.1 , end: 0.2}], 
				messageA_translateY_out : [0,-20,{start: 0.25 , end: 0.3}], 
				messageB_opacity_in : [0,1, {start: 0.3 , end: 0.4}], //30%,40%
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
			}
		},
		{
			scrollHeight:0, 
			heightNum : 5, 
			type:'normal',
			objs :{ 
				container : document.querySelector('#scroll-section-1'),
			}
		},
		{
			scrollHeight:0, 
			heightNum : 5, 
			type:'sticky',
			objs :{ 
				container : document.querySelector('#scroll-section-2'),
				container: document.querySelector('#scroll-section-2'),
		        messageA: document.querySelector('#scroll-section-2 .a'),
		        messageB: document.querySelector('#scroll-section-2 .b'),
		        messageC: document.querySelector('#scroll-section-2 .c'),
		        pinB: document.querySelector('#scroll-section-2 .b .pin'),
		        pinC: document.querySelector('#scroll-section-2 .c .pin')
			},
			values: {
	            messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
	            messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
	            messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
	            messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
	            messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
	            messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
	            messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
	            messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
	            messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
	            messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
	            messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
	            messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
	            pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
	            pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
			}
		},
		{
			scrollHeight:0, 
			heightNum : 5, 
			type:'sticky',
			objs :{ 
				container : document.querySelector('#scroll-section-3'),
	            canvasCaption: document.querySelector('.canvas-caption')
			},
			 values: {

	        }
		},
	];
	
	function setLayout(){
		//각 스크롤 섹션 높이 설정
		for(let i=0;i<sceneInfo.length;i++){
			
			if(sceneInfo[i].type === 'sticky'){
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //전체 창 높이
			}else if(sceneInfo[i].type === 'normal'){
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}
			console.log(sceneInfo[i].objs.container.style.height)
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;	
			
		}
		
		//새로고침일 경우 현재 씬 맞추기
		let totalScrollHeight = 0;
		for(let i=0;i<sceneInfo.length;i++){
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if( totalScrollHeight >= yOffset ){ //전체 height 보다 현재 스크롤이 작으면 현재 i 를 currentscene으로
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id',`show-scene-section-${currentScene}`);
	}

	//values--	messageA_opacity : [0,1, {start: 0.1 , end: 0.2}], 
	function calcValues( values, currentYOffset ){ //현재 스크롤의 opacity,현재 씬안에서 스크롤위치
		let rv;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		//현재 씬 전체에서 스크롤된 범위(현재 위치 )를 비율로 구하기 0~1 사이의 값
		let scollRatio= currentYOffset / scrollHeight;
		
		if( values.length === 3 ){
			//start~end 사이 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight; //start: 0.1 * 3000
			const partScrollEnd = values[2].end * scrollHeight; // end: 0.2 * 3000
			const partScrollHeight = partScrollEnd - partScrollStart ; //600-300 
			
			if(currentYoffset >= partScrollStart && currentYoffset <= partScrollEnd){
				rv = ( currentYOffset - partScrollStart ) / partScrollHeight  * ( values[1]-values[0] ) + values[0];
			}else if(currentYoffset < partScrollStart ){
				rv=  values[0];
			}else if(currentYoffset > partScrollEnd ){
				rv=  values[1];
			}
			
		}else { 
			//opacity 마지막값 - 첫번째값 = 전체값 
			// 200/3000 =15 * (1-0) + 0 = 1 
			rv = scollRatio * ( values[1]-values[0] ) + values[0];	
		}
		
		return rv;
	}

	//메뉴 높이가 스크롤에 포함되지 않도록  css 로 고정값을 주면(absolute,top,left) 됨
	
	let yOffset = window.pageYOffset ; //window.pageYOffset 대신 사용할 변수
	let prevScrollHeight =0 ; //지금까지 내려온 스크롤 합
	let currentScene = 0 ; //현재 활성화된 scene 
	let enterNewScene = false; //새로운 씬이 시작되는 순간 true -- 씬 변화시 음수 차단용
	
	/* 
	 	yoffset 과 prevscroll 을 비교해서 scenecurrent 찾아 
	 */
	function scrollLoop(){
		enterNewScene = false;
		prevScrollHeight =0;
		
		for(let i=0;i< currentScene;i++){
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		
		if(yOffset > (prevScrollHeight + sceneInfo[currentScene].scrollHeight)){
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id',`show-scene-section-${currentScene}`);
		}
		if(yOffset < prevScrollHeight){
			enterNewScene = true;
			if(curreuntScene==0) return; //웹에서 top에서 바운스 될때 yoffset이 -값이 나와 에러되지 않도록 방지
			currentScene--;
			document.body.setAttribute('id',`show-scene-section-${currentScene}`);
		}
		if(enterNewScene) return;
		
		playAnimation();
	}
	
	
	//현재 씬 안에 요소들 컨트롤
	function playAnimation(){
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScollHeight ;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight ;// 현재씬에서의 현재위치 /현재씬의 전체 scrollHeight
		switch(currentScene){
			case 0:
				/*const messageA_opacity_in = calcValues( values.messageA_opacity_in ,  currentYOffset );
				const messageA_opacity_out = calcValues( values.messageA_opacity_out ,  currentYOffset );
				const messageA_translateY_in = calcValues( values.messageA_translateY_in ,  currentYOffset );
				const messageA_translateY_out = calcValues( values.messageA_translateY_out ,  currentYOffset );*/
				
				if(scrollRatio <= 0.22){
					objs.messageA.style.opacity =calcValues( values.messageA_opacity_in ,  currentYOffset );
					//objs.messageA.style.transform = `translateY(${calcValues( values.messageA_translateY_in ,  currentYOffset )}%)`;
					objs.messageA.style.transform = `translate3d(0,${calcValues( values.messageA_translateY_in ,  currentYOffset )}%,0)`;
				}else{
					objs.messageA.style.opacity = calcValues( values.messageA_opacity_out ,  currentYOffset );
					objs.messageA.style.transform = `translate3d(0,${calcValues( values.messageA_translateY_out ,  currentYOffset )}%,0)`;
				}
			
				if (scrollRatio <= 0.42) {
	                // in
	                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
	                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
	            } else {
	                // out
	                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
	                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
	            }
				
				if (scrollRatio <= 0.62) {
	                // in
	                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
	                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
	            } else {
	                // out
	                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
	                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
	            }

	            if (scrollRatio <= 0.82) {
	                // in
	                objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
	                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
	            } else {
	                // out
	                objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
	                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
	            }
				break;
			case 2:
				  // console.log('2 play');
	            if (scrollRatio <= 0.32) {
	                // in
	                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
	                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
	            } else {
	                // out
	                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
	                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
	            }

	            if (scrollRatio <= 0.67) {
	                // in
	                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
	                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
	                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
	            } else {
	                // out
	                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
	                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
	                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
	            }

	            if (scrollRatio <= 0.93) {
	                // in
	                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
	                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
	                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
	            } else {
	                // out
	                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
	                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
	                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
	            }

				break;
			case 3:
				break;
		}
	}
	//키 프레임 : 애니메이션의 변화가 있는 지점
	
	
	//window.addEventListner('DOMContentLoaded',setLayout); //HTML 객체 로드만 되면 실행, load 보다 빠름
	window.addEventListener('load',setLayout);
	window.addEventListener('resize',setLayout);
	window.addEventListener('scroll',()=>{
		yOffset = window.pageYOffset; //현재 페이지 스크롤 위치
		scrollLoop();
	});

	
})();

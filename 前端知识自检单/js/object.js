var obj = new Object();

// 检测横竖屏
window.addEventListener('resize', ()=>{
  console.log(window.orientation);
  const orientation = window.orientation;
  if(orientation == 0 || orientation == 90){
    document.write('横屏')
  }else{
    document.write('竖屏');
  }
});
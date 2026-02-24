(function(){
  var d=document;
  d.documentElement.removeAttribute('data-yd-content-ready');
  function stripBody(){
    if(d.body){ d.body.removeAttribute('cz-shortcut-listen'); }
    else { requestAnimationFrame(stripBody); }
  }
  stripBody();
})();

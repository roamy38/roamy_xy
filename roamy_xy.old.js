//==============================================================================
//==== Globale Funktionen zur Manipulation von Web-Elementen : =================
//==============================================================================
function str_replace( INPUT , FROM , TO ){ return INPUT.slpit( FROM ).join( TO ); }
//------------------------------------------------------------------------------
function htm_id( id ){ return document.getElementById( id ); }
//------------------------------------------------------------------------------
function isObject( obj ){ return !(isNaN( obj.offsetTop )); }
//------------------------------------------------------------------------------
function Roamy_forceObject( obj ){
        if( obj.id ){ return obj; }
	if( isObject( obj ) ){ return obj; }
        if( obj.concat && isObject( obj[0] ) ){ return obj[0]; }
return htm_id( obj );
} 
//------------------------------------------------------------------------------
function htm_name( name ){ return Roamy_forceObject( document.getElementsByName( name ) ); }
//------------------------------------------------------------------------------
function htm_tag( TagName ){ return Roamy_forceObject( document.getElementsByTagName( TagName ) ); }
//------------------------------------------------------------------------------

//==============================================================================
function htm_left( obj ){
	var i_X = 0;
	while( obj.offsetParent ){
		i_X += obj.offsetLeft;
		obj = obj.offsetParent;
	}
return i_X;
}
//------------------------------------------------------------------------------
function htm_top( obj ){
	var i_Y = 0;
	while( obj.offsetParent ){
		i_Y += obj.offsetTop;
		obj = obj.offsetParent;
	}
return i_Y;
}
//------------------------------------------------------------------------------
function htm_top2( obj , X ){ obj.style.top = parseInt( X ) + "px"; }
//------------------------------------------------------------------------------
function htm_left2( obj , X ){ obj.style.left = parseInt( X ) + "px"; }
//==============================================================================
function htm_doc_top( ){ return window.pageYOffset; }
//------------------------------------------------------------------------------
function htm_doc_left( ){ return window.pageXOffset; }
//------------------------------------------------------------------------------
function htm_doc_width( ){ return window.innerWidth; }
//------------------------------------------------------------------------------
function htm_doc_height( ){ return window.innerHeight; }
//------------------------------------------------------------------------------
function htm_doc_left2( X ){ window.pageXOffset = parseInt( X ); }
//------------------------------------------------------------------------------
function htm_doc_top2( Y ){ window.pageYOffset = parseInt( Y ); }
//------------------------------------------------------------------------------
function htm_width( obj ){ return obj.offsetWidth; }
//------------------------------------------------------------------------------
function htm_height( obj ){ return obj.offsetHeight; }
//------------------------------------------------------------------------------
function htm_width2( obj , x ){ obj.style.width = parseInt( x ) + "px"; }
//------------------------------------------------------------------------------
function htm_height2( obj , y ){ obj.style.height = parseInt( y ) + "px"; }
//------------------------------------------------------------------------------
function setOpacityOfElement( Obj , val ){Obj.style.opacity = val;}
//------------------------------------------------------------------------------
function getOpacityOfElement( obj ){ return obj.style.opacity;}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//==============================================================================
if( !self.innerWidth ){
//      -----------------------------IEXPLORER----------------------------------
        if( isFinite( window.document.body.scrollLeft ) ){
                htm_left2 = function( obj , X ){ obj.style.pixelLeft = parseInt( X ); }
                htm_top2 = function( obj , Y ){ obj.style.pixelTop = parseInt( Y ); }
                htm_width2 = function( obj , X ){ obj.style.pixelWidth = parseInt( X ); }
                htm_height2 = function( obj , Y ){ obj.style.pixelHeight = parseInt( Y ); }
                htm_doc_left = function(){ return window.document.body.scrollLeft; }                
                htm_doc_top = function(){ return window.document.body.scrollTop; }                
                htm_doc_width = function(){ return document.body.offsetWidth; }                
                htm_doc_height = function(){ return document.body.offsetHeight; }                
                htm_doc_left2 = function( X ){ window.scrollTo( window.document.body.scrollLeft , Y ); }                
                htm_doc_top2 = function( Y ){ window.scrollTo( X , window.document.body.scrollTop ); }
                setOpacityOfElement = function( Obj , val ){ Obj.style.filter = "alpha(opacity=" + parseInt( val*100 ) + ")";}                                                          
        }
}
//---------------------------------SNIFFER--------------------------------------
//==============================================================================
//======  Servicefunktionen eines Objektes : ===================================
//==============================================================================
function htm_Move( obj , X , Y ){
        obj = Roamy_forceObject( obj );
        htm_left2( obj , parseInt( X ) );
        htm_top2( obj , parseInt( Y ) );
}
//==============================================================================
function htm_MoveBy( obj , X , Y ){
        obj = Roamy_forceObject( obj );
        htm_left2( obj , htm_left( obj ) + parseInt( X ) );
        htm_top2( obj , htm_top( obj ) + parseInt( Y ) );
        for( var i = 0 ; i < obj.childNodes.length ; i++ ){
                if( obj.childNodes[i].nodeType ==1 /* && obj.childNodes[i].style && obj.childNodes[i].style.position == "absolute" */ ){
                        htm_MoveBy( obj.childNodes[i] , X , Y );
                }
        }
}
//==============================================================================
function htm_X( obj ){ return htm_left( obj ); }
//------------------------------------------------------------------------------
function htm_Y( obj ){ return htm_top( obj ); }
//------------------------------------------------------------------------------
function htm_right( obj ){ return htm_left( obj ) + htm_width( obj ); }
//------------------------------------------------------------------------------
function htm_bottom( obj ){ return htm_top( obj ) + htm_height( obj ); }
//------------------------------------------------------------------------------
function htm_center( obj ){ return htm_left( obj ) + parseInt(( htm_width( obj ) + 1 ) / 2); }
//------------------------------------------------------------------------------
function htm_middle( obj ){ return htm_top( obj ) + parseInt(( htm_height( obj ) + 1 ) / 2); }
//------------------------------------------------------------------------------
function htm_right2( obj , X ){ htm_left2( X - htm_width( obj ) ); }
//------------------------------------------------------------------------------
function htm_bottom2( obj , X ){ htm_top2( X - htm_height( obj ) ); }
//------------------------------------------------------------------------------
function htm_center2( obj , X ){ htm_left2( X - parseInt(( htm_width( obj ) + 1 ) / 2) ); }
//------------------------------------------------------------------------------
function htm_middle2( obj , X ){ htm_top2( X - parseInt(( htm_height( obj ) + 1 ) / 2) ); }
//==============================================================================
//==== Globale Funktion zur Ermitteln eines Parent-Elementes: ==================
//==============================================================================
function htm_parent( obj , s_tag ){
	s_tag = s_tag.toUpperCase();
	var o_parent = obj;
	while( !o_parent.tagName || o_parent.tagName.toUpperCase() != s_tag ){
		o_parent = o_parent.parentNode;
		if( o_parent == document ){ return null; }
	}
return o_parent;
}
//==============================================================================
//======= Top der Menu_Div mit der Aufruf des Ereignises onmove: ===============
//==============================================================================
function MouseY( Ereignis ){
	var iY;
	if( window.event ){
		Ereignis = window.event;
		if( !Ereignis ) return;
		iX = Ereignis.clientX + ( 0 || document.body.scrollLeft );
	}
	else{
		iX = parseInt( Ereignis.pageX );
	}
return htm_left( Ereignis.target ) + iX - parseInt( htm_width( Ereignis.target ) / 2 );
}
//==============================================================================
//======= Top der Menu_Div mit der Aufruf des Ereignises onmove: ===============
//==============================================================================
function MouseX( Ereignis ){
	var iY;
	if( window.event ){
		Ereignis = window.event;
		if( !Ereignis ) return;
		iY = Ereignis.clientY + ( 0 || document.body.scrollTop );
	}
	else{
		iY = parseInt( Ereignis.pageY );
	}
	
return htm_top( Ereignis.target ) + iY - parseInt( htm_height( Ereignis.target ) / 2 );
}
//==============================================================================
function htm_mouseup( Ereignis ){
	Ereignis.target.style.pointer = "pointer";
}
//==============================================================================
function htm_mouseout( Ereignis ){
	Ereignis.target.style.pointer = "pointer";
}
//==============================================================================
function htm_mousedown( Ereignis ){ 
	Ereignis.target.style.pointer = "cross";
	
}
//==============================================================================

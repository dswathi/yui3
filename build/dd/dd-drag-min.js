YUI.add("dd-drag",function(D){var E=D.DD.DDM,R="node",L="dragNode",C="offsetHeight",J="offsetWidth",P="mouseup",N="mousedown",G="drag:mouseDown",B="drag:afterMouseDown",F="drag:removeHandle",K="drag:addHandle",O="drag:removeInvalid",Q="drag:addInvalid",I="drag:start",H="drag:end",M="drag:drag";var A=function(){A.superclass.constructor.apply(this,arguments);E._regDrag(this);};A.NAME="drag";A.ATTRS={node:{set:function(S){return D.Node.get(S);}},dragNode:{set:function(S){return D.Node.get(S);}},offsetNode:{value:true},clickPixelThresh:{value:E.clickPixelThresh},clickTimeThresh:{value:E.clickTimeThresh},lock:{value:false,set:function(S){if(S){this.get(R).addClass("yui-dd-locked");}else{this.get(R).removeClass("yui-dd-locked");}}},data:{value:false},move:{value:true},useShim:{value:true},activeHandle:{value:false},primaryButtonOnly:{value:true},dragging:{value:false},target:{value:false,set:function(S){this._handleTarget(S);}},dragMode:{value:"default",set:function(S){switch(S){case"point":return 0;case"intersect":return 1;case"strict":return 2;case"default":return -1;}return"default";}},groups:{value:["default"],get:function(){if(!this._groups){this._groups={};}var S=[];D.each(this._groups,function(U,T){S[S.length]=T;});return S;},set:function(S){this._groups={};D.each(S,function(U,T){this._groups[U]=true;},this);}}};D.extend(A,D.Base,{addToGroup:function(S){this._groups[S]=true;E._activateTargets();return this;},removeFromGroup:function(S){delete this._groups[S];E._activateTargets();return this;},target:null,_handleTarget:function(S){if(D.DD.Drop){if(S===false){if(this.target){E.unregTarget(this.target);this.target=null;}return false;}else{if(!D.Lang.isObject(S)){S={};}S.node=this.get(R);this.target=new D.DD.Drop(S);}}else{return false;}},_groups:null,_createEvents:function(){this.publish(G,{defaultFn:this._handleMouseDown,emitFacade:true,bubbles:true});var S=[B,F,K,O,Q,I,H,M,"drag:drophit","drag:dropmiss","drag:over","drag:enter","drag:exit"];D.each(S,function(U,T){this.publish(U,{emitFacade:true,bubbles:true,preventable:false});},this);this.addTarget(E);},_ev_md:null,_handles:null,_invalids:null,_invalidsDefault:{"textarea":true,"input":true,"a":true,"button":true},_dragThreshMet:null,_fromTimeout:null,_clickTimeout:null,deltaXY:null,startXY:null,nodeXY:null,lastXY:null,mouseXY:null,region:null,_handleMouseUp:function(S){this._fixIEMouseUp();if(E.activeDrag){E._end();}},_ieSelectFix:function(){return false;},_ieSelectBack:null,_fixIEMouseDown:function(){if(D.UA.ie){this._ieSelectBack=document.body.onselectstart;document.body.onselectstart=this._ieSelectFix;}},_fixIEMouseUp:function(){if(D.UA.ie){document.body.onselectstart=this._ieSelectBack;}},_handleMouseDownEvent:function(S){this.fire(G,{ev:S});},_handleMouseDown:function(U){var T=U.ev;this._dragThreshMet=false;this._ev_md=T;if(this.get("primaryButtonOnly")&&T.button>1){return false;}if(this.validClick(T)){this._fixIEMouseDown();T.halt();this._setStartPosition([T.pageX,T.pageY]);E.activeDrag=this;var S=this;this._clickTimeout=setTimeout(function(){S._timeoutCheck.call(S);},this.get("clickTimeThresh"));}this.fire(B,{ev:T});},validClick:function(W){var V=false,S=W.target,U=null;if(this._handles){D.each(this._handles,function(X,Y){if(D.Lang.isString(Y)){if(S.test(Y+", "+Y+" *")){U=Y;V=true;}}});}else{if(this.get(R).contains(S)||this.get(R).compareTo(S)){V=true;}}if(V){if(this._invalids){D.each(this._invalids,function(X,Y){if(D.Lang.isString(Y)){if(S.test(Y+", "+Y+" *")){V=false;}}});}}if(V){if(U){var T=W.originalTarget.queryAll(U);T.each(function(Y,X){if(Y.contains(S)||Y.compareTo(S)){this.set("activeHandle",T.item(X));}},this);}else{this.set("activeHandle",this.get(R));}}return V;},_setStartPosition:function(S){this.startXY=S;this.nodeXY=this.get(R).getXY();this.lastXY=this.nodeXY;if(this.get("offsetNode")){this.deltaXY=[(this.startXY[0]-this.nodeXY[0]),(this.startXY[1]-this.nodeXY[1])];}else{this.deltaXY=[0,0];}},_timeoutCheck:function(){if(!this.get("lock")){this._fromTimeout=true;this._dragThreshMet=true;this.start();this._moveNode([this._ev_md.pageX,this._ev_md.pageY],true);}},removeHandle:function(S){if(this._handles[S]){delete this._handles[S];this.fire(F,{handle:S});}return this;},addHandle:function(S){if(!this._handles){this._handles={};}if(D.Lang.isString(S)){this._handles[S]=true;this.fire(K,{handle:S});}return this;},removeInvalid:function(S){if(this._invalids[S]){delete this._handles[S];this.fire(O,{handle:S});}return this;},addInvalid:function(S){if(D.Lang.isString(S)){this._invalids[S]=true;this.fire(Q,{handle:S});}else{}return this;},initializer:function(){if(!this.get(R).get("id")){var S=D.stamp(this.get(R));this.get(R).set("id",S);}this._invalids=this._invalidsDefault;this._createEvents();if(!this.get(L)){this.set(L,this.get(R));}this.get(R).addClass("yui-draggable");this.get(R).on(N,this._handleMouseDownEvent,this,true);this.get(R).on(P,this._handleMouseUp,this,true);this._dragThreshMet=false;},start:function(){if(!this.get("lock")){this.set("dragging",true);E._start(this.deltaXY,[this.get(R).get(C),this.get(R).get(J)]);this.get(R).addClass("yui-dd-dragging");this.fire(I,{pageX:this.nodeXY[0],pageY:this.nodeXY[1]});this.get(L).on(P,this._handleMouseUp,this,true);var S=this.nodeXY;this.region={"0":S[0],"1":S[1],area:0,top:S[1],right:S[0]+this.get(R).get(J),bottom:S[1]+this.get(R).get(C),left:S[0]};}return this;},end:function(){clearTimeout(this._clickTimeout);this._dragThreshMet=false;this._fromTimeout=false;if(!this.get("lock")&&this.get("dragging")){this.fire(H,{pageX:this.lastXY[0],pageY:this.lastXY[1]});}this.get(R).removeClass("yui-dd-dragging");this.set("dragging",false);this.deltaXY=[0,0];this.get(L).detach(P,this._handleMouseUp,this,true);return this;},_align:function(S){return[S[0]-this.deltaXY[0],S[1]-this.deltaXY[1]];},_moveNode:function(S,X){var W=this._align(S),T=[],U=[];T[0]=(W[0]-this.lastXY[0]);T[1]=(W[1]-this.lastXY[1]);U[0]=(W[0]-this.nodeXY[0]);U[1]=(W[1]-this.nodeXY[1]);if(this.get("move")){if(D.UA.opera){this.get(L).setXY(W);
}else{E.setXY(this.get(L),T);}}this.region={"0":W[0],"1":W[1],area:0,top:W[1],right:W[0]+this.get(R).get(J),bottom:W[1]+this.get(R).get(C),left:W[0]};var V=this.nodeXY;if(!X){this.fire(M,{pageX:W[0],pageY:W[1],info:{start:V,xy:W,delta:T,offset:U}});}this.lastXY=W;},_move:function(U){if(this.get("lock")){return false;}else{this.mouseXY=[U.pageX,U.pageY];if(!this._dragThreshMet){var T=Math.abs(this.startXY[0]-U.pageX);var S=Math.abs(this.startXY[1]-U.pageY);if(T>this.get("clickPixelThresh")||S>this.get("clickPixelThresh")){this._dragThreshMet=true;this.start();this._moveNode([U.pageX,U.pageY]);}}else{clearTimeout(this._clickTimeout);this._moveNode([U.pageX,U.pageY]);}}},stopDrag:function(){if(this.get("dragging")){E._end();}return this;},destructor:function(){E._unregDrag(this);this.get(R).detach(N,this._handleMouseDownEvent,this,true);this.get(R).detach(P,this._handleMouseUp,this,true);}});D.namespace("DD");D.DD.Drag=A;},"@VERSION@",{requires:["dd-ddm-base"],skinnable:false});
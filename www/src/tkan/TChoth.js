
export class TChoth {
    constructor(par, fun) {
        this.type = "TChoth";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.arr0 = []
        this.arr1 = []




        this._material= new THREE.MeshPhongMaterial({
          color: 0xffFFff,    // red (can also use a CSS color string here)
          side:THREE.DoubleSide
         // flatShading: true,
        });
        this.content3d = new THREE.Object3D()
        this.par.content3d.add(this.content3d)


        this._boolDebug = this.par.boolDebug   

        var ARC_HH = this.par._kw * 4;
        var ARC_WW = this.par._kh * 4;

        var arrTB = []
        var arrVect = []
        var arrAxes = []
        var kol;
        this.kol = kol = this.par.kol;
        var kol1=kol-1;

        let bbb=false
        this.initDebag = function() {
            if(bbb)return;
            bbb=true;

            
            var geometryH = new THREE.BufferGeometry();
            geometryH.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_HH * 3), 3));
            
            var geometryW = new THREE.BufferGeometry();
            geometryW.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ARC_WW * 3), 3));


            //let mm=pm.mat.getIDReturn(95)
            let mm=new THREE.LineBasicMaterial( { color: 0x00ff00 } );
            let curve
            for (var i = 0; i < this.arr0.length; i++) {
                curve=this.arr0[i];
                curve.mesh = new THREE.Line(geometryH.clone(), mm);  
                curve.mesh.castShadow = true;
                
            }
           
            for (var i = 0; i < this.arr1.length; i++) {
                curve=this.arr1[i];
                curve.mesh = new THREE.Line(geometryH.clone(), mm);  
                curve.mesh.castShadow = true;
                
            }
        }

        this.drag = function() {
            for (var i = 0; i < this.par._kw; i++) {
                let positions = []
                for (var j = 0; j < this.par._kh; j++) {
                    positions[j] = new THREE.Vector3(
                        Math.random() * 922,
                        Math.random() * 922,
                        Math.random() * 922
                    )
                }
                let curve = new THREE.CatmullRomCurve3(positions);
                this.arr0[i] = curve
                curve.curveType = 'chordal';
              
            }


            for (var i = 0; i < this.par._kh; i++) {
                let positions = []
                for (var j = 0; j < this.par._kw; j++) {
                    positions[j] = new THREE.Vector3(
                        Math.random() * 922,
                        Math.random() * 922,
                        Math.random() * 922
                    )
                }

                let curve = new THREE.CatmullRomCurve3(positions);
                this.arr1[i] = curve
                curve.curveType = 'chordal';
              /*  if(this.boolDebug==true){
                    curve.mesh = new THREE.Line(geometryW.clone(), pm.mat.getIDReturn(95));
                    curve.mesh.castShadow = true;
                    this.content3d.add(curve.mesh)
                }*/
            }


            for (var i = 0; i < this.par._kw * kol; i++) {
                arrVect[i] = []
                arrAxes[i] = []
                for (var j = 0; j < this.par._kh * kol; j++) {

                    arrAxes[i][j] = new THREE.Object3D()
                    arrVect[i][j] = arrAxes[i][j].position //=new THREE.Vector3()
                    this.content3d.add(arrAxes[i][j])
                }
            }

            for (var i = 0; i < this.par._kw - 1; i++) {
                arrTB[i] = []
                for (var j = 0; j < this.par._kh - 1; j++) {
                    
                   // if(i==0 && j==0){
                        let tb = new TCBlok(this)
                        arrTB[i][j] = tb
                        tb.setPoint(
                            i, this.par._kw,
                            j, this.par._kh,
                        )
                        tb.setCurves(
                            this.arr1[j],
                            this.arr1[j + 1],
                            this.arr0[i],
                            this.arr0[i + 1]
                        )
                        let ap = []
                        for (var ii = 0; ii < kol; ii++) {
                            ap[ii] = []
                            for (var jj = 0; jj < kol; jj++) {
                                ap[ii][jj] = arrVect[i + ii][j + jj]
                            }
                        }
                        tb.ap = ap

                   // }
                    

                }
            }
        }

        var tikAlways=0
        var ro,bTik
        this.upDate = function() {
            
            tikAlways=this.par.tikAlways
          
            if(tikAlways==0){
                this.upDate1();
                return
            }
            
            bTik=false
            ro=0
            let i=0
            for (i = 0; i < this.par.array.length; i++) {
                ro+=this.par.array[i].getOtOld();
            }



            if(ro>tikAlways){
                for (i = 0; i < this.par.array.length; i++) {
                    this.par.array[i].vOld.copy(this.par.array[i].content3d.position)
                }
                bTik=true   
            }/**/
            //trace(bTik, ro)

            //trace(bTik,ro,tikAlways)


            if(bTik)this.upDate1();      
    
        }   


        const point = new THREE.Vector3();
        this.sahTrace = 0
        this.upDate1 = function() {
            let j, i, t, curve, position
            this.sahTrace++
            for (j = 0; j < this.par._kh; j++) {
                curve = this.arr1[j]
                for (i = 0; i < curve.points.length; i++) {
                    this.par.arr[j][i].op3d.getWorldPosition(curve.points[i])
                   
                }
                if(this._boolDebug==true){
                    if(this._boolDebug)this.initDebag()
                    position = this.arr1[j].mesh.geometry.attributes.position;
                    for (i = 0; i < ARC_WW; i++) {
                        t = i / (ARC_WW - 1);
                        this.arr1[j].getPoint(t, point);
                        position.setXYZ(i, point.x, point.y, point.z);
                    }
                    position.needsUpdate = true;
                    this.arr1[j].mesh.geometry.computeBoundingSphere()
                }
            }

            for (j = 0; j < this.par._kw; j++) {
                curve = this.arr0[j]
                for (i = 0; i < this.par._kh; i++) {
                    this.par.arr[i][j].op3d.getWorldPosition(curve.points[i])
                   
                }
                if(this._boolDebug==true){
                    if(this._boolDebug)this.initDebag()
                    position = this.arr0[j].mesh.geometry.attributes.position;
                    for (i = 0; i < ARC_HH; i++) {
                        t = i / (ARC_HH - 1);
                        this.arr0[j].getPoint(t, point);
                        position.setXYZ(i, point.x, point.y, point.z);
                    }
                    position.needsUpdate = true;
                    this.arr0[j].mesh.geometry.computeBoundingSphere()
                }
            }
            
            this.upDateGeometry()
        }



        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        let kolTriang=this.par._kw*this.par._kh*kol*11
        let geometry = new THREE.BufferGeometry();
        
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3)); 
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(2), 2)); 
        let positAAA
        let kp=3




        
        
        let mesh = new THREE.Mesh(geometry, this._material);
        mesh.castShadow = true;
        this.mesh=mesh
        this.content3d.add(mesh)


        mesh.tkan = this.par;
       // mesh.pipe = this.par;
/*
         let mesh1 = new THREE.Mesh(new THREE.BoxGeometry(50,50,50), m);
        mesh1.castShadow = true;
        this.content3d.add(mesh1)
        mesh1.position.x=100;
        mesh1.position.z=100;*/



        var arrPositionAttribut,arrUvAttribut
        

        var arrP=[]
        var arrUV=[]    
        var arrPosition=[]
        var sahS=0;
        var ap=[]

        var puv0=new THREE.Vector2()
        var puv1=new THREE.Vector2()
        var i,ii,jj,j
        var _p0,_p1,_p2,sad,sad1

        var _ww0, _ww1, _www
        var _hh0, _hh1, _hhh 
        this.upDateGeometry = function() {
           /* arrTB[0][0].upDate()    
            return*/

            for (let i = 0; i < this.par._kw - 1; i++) {                
                for (let j = 0; j < this.par._kh - 1; j++) {                    
                    arrTB[i][j].upDate()
                }
            }

            ap.length=0;
            arrP.length=0;
            arrUV.length=0;
            sad1=0    
            sad=0
            j=0


          /*  _www=(this.par._kw-1)*kol-1
            for (let i = 0; i < this.par._kw - 1; i++) {   
                for (ii = 0; ii < kol1; ii++) { 
                    _ww0 = (i*kol+ii)/_www
                    _ww1 = (i*kol+ii+1)/_www
                    
                }
            }*/


            _www=(this.par._kw-1)*kol-1
            _hhh=(this.par._kh-1)*kol-1
            for (let i = 0; i < this.par._kw - 1; i++) {    
                for (j = 0; j < this.par._kh - 1; j++) {  

            /*for (let i = 0; i < 1; i++) {    
                for (j = 0; j < 1; j++) {         */          
                   
                    for (ii = 0; ii < kol1; ii++) { 
                        _ww0 = (i*kol+ii)/_www
                        _ww1 = (i*kol+ii+1)/_www


                        jj=0
                        for (jj = 0; jj < kol1; jj++) { 

                            _hh0 = (j*kol+jj)/_hhh
                            _hh1 = (j*kol+jj+1)/_hhh

                         


                            puv0.x=_ww0
                            puv0.y=_hh0

                            puv1.x=_ww1
                            puv1.y=_hh1

                      

                            this.upDG(                            
                                arrTB[i][j].arrVect[ii][jj],
                                arrTB[i][j].arrVect[ii+1][jj],
                                arrTB[i][j].arrVect[ii+1][jj+1],
                                arrTB[i][j].arrVect[ii][jj+1],

                                arrTB[i][j].arrUV[ii][jj],
                                arrTB[i][j].arrUV[ii+1][jj],
                                arrTB[i][j].arrUV[ii+1][jj+1],
                                arrTB[i][j].arrUV[ii][jj+1],

                            ) 
                          
                        }
                    }


                }
            }



            kp=arrP.length
            if(sahS==0){                
                geometry.setIndex(arrPosition)


                arrPositionAttribut = new Float32Array(kp);
                geometry.setAttribute('position', new THREE.BufferAttribute(arrPositionAttribut, 3));
               
                arrUvAttribut = new Float32Array(arrUV.length);
                geometry.setAttribute('uv', new THREE.BufferAttribute(arrUvAttribut, 2));
            }

            for (i = 0; i < kp; i++) {
                arrPositionAttribut[i]=arrP[i]
            }
            for (i = 0; i < arrUV.length; i++) {
                arrUvAttribut[i] = arrUV[i]
            }

         
            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.uv.needsUpdate = true;
            geometry.computeVertexNormals()
            geometry.computeBoundingSphere() 


            sahS++
        }


        this.tipSah=0
        let sx,sy
        this.upDG = function(p0,p1,p2,p3, uv0,uv1,uv2,uv3) {

            if(sahS===0){
                arrPosition.push(sad, sad+1, sad+2, sad+3, sad+4, sad+5)
                //arrPosition.push(sad+5, sad+4, sad+3, sad+2, sad+1, sad)
            }

            arrP.push(
                p0.x, p0.y, p0.z, 
                p1.x, p1.y, p1.z,
                p3.x, p3.y, p3.z,

                p1.x, p1.y, p1.z,
                p2.x, p2.y, p2.z,
                p3.x, p3.y, p3.z/**/
            ) 
            arrUV.push(
                uv0.x, uv0.y,
                uv1.x, uv1.y,
                uv3.x, uv3.y,

                uv1.x, uv1.y,
                uv2.x, uv2.y,
                uv3.x, uv3.y,
            )


            sad+=6



           

        }
        
        let pp=new THREE.Vector3()
        this.getProsent = function(e) {

            let o={x:0, y:0}

            
            let dd=999999999;
            let di,dj,dpi,dpj
            let d11=999999999;
            di=-1
            for (let i = 0; i < this.par._kw - 1; i++) {                
                for (let j = 0; j < this.par._kh - 1; j++) {                    
                    dd = arrTB[i][j].getDistans(e)

                    if(d11>dd.distans){
                        d11=dd.distans;
                        di=dd.i;
                        dj=dd.j;
                        dpi=dd.pi;
                        dpj=dd.pj; 
                  
                     }
                }
            } 
            if(di!=-1){
                o.x=dpi;
                o.y=dpj;
            }


            return o
        }


        


        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////

        this.upIJ = function(tb) {

        }

    }
    set material(v) {
        if (this._material != v) {
            this._material = v;
            //this.drag()
            this.mesh.material=this._material
        }
    }
    get material() { return this._material; }


    set boolDebug(v) {
        if (this._boolDebug != v) {
            this._boolDebug = v;
            this.initDebag()
            if(this._boolDebug){
                for (var i = 0; i < this.arr0.length; i++) {                   
                    this.content3d.add(this.arr0[i].mesh)
                }
               
                for (var i = 0; i < this.arr1.length; i++) {                   
                    this.content3d.add(this.arr1[i].mesh)
                }
            }else{
                for (var i = 0; i < this.arr0.length; i++) {                   
                    this.content3d.remove(this.arr0[i].mesh)
                }
               
                for (var i = 0; i < this.arr1.length; i++) {                   
                    this.content3d.remove(this.arr1[i].mesh)
                }
            }
        }
    }
    get boolDebug() { return this._boolDebug; }



}




export class TCBlok {
    constructor(par, fun) {
        this.type = "TCBlok";
        var self = this;
        this.par = par;
        this.fun = fun;
        this.arrCurve = [];
        this.arrPoint = [];

        this.arrVect = [];
        this.arrUV = [];

        this.arrAxes = [];

        var kol=this.par.kol
        var kol1=this.par.kol-1



        let i, j, curve, t
        for (i = 0; i < this.par.kol; i++) {
            this.arrVect[i] = []
            this.arrUV[i] = []

            for ( j = 0; j < this.par.kol; j++) {          
                this.arrUV[i][j]=new THREE.Vector2(i/kol1, j/kol1)
                this.arrVect[i][j]=new THREE.Vector3()
            }
        }
        


        this.ii = 1
        this.iii = 1
        this.jj = 1
        this.jjj = 1
        this.sx = 1
        this.px = 1
        this.sy = 1
        this.py = 1

        this.p1 = 1
        this.p3 = 1
        this.p1z = 1
        this.p3z = 1
        this.setPoint = function(p, p1, p2, p3) {
            this.ii = p
            this.iii =p+1  

            this.jj = p2
            this.jjj =p2+1    

            this.sx = p / (p1-1)
            this.px = 1 / (p1-1) / (this.par.kol-1)

            

            this.sy = p2 / (p3-1)
            this.py = 1 / (p3-1) / (this.par.kol-1)
           
            
            this.p1=p1;
            this.p3=p3;

            this.p1z = (1/(this.p1-1))*this.ii
            this.p3z = (1/(this.p3-1))*this.jj


        }
        //let pp=new THREE.Vector3()
        let orr={distans:0,i:0,pi:0,j:0,pj:0}
        let dd=999999999;
        let di,dj
        let d11=999999999;
        this.getDistans = function(e) {
            d11=999999999;
            for (i = 0; i < kol; i++) {                
                for ( j = 0; j < kol; j++) {
                    pp.set(this.arrVect[i][j].x,this.arrVect[i][j].y,this.arrVect[i][j].z)
                    bMenedsher.coroktV3(pp,true)   
                    dd=this.getDistance3d(pp,e )
                    if(dd<d11){
                        d11=dd;
                        orr.i=i
                        orr.j=j
                        orr.pi=this.sx + i * this.px
                        orr.pj=this.sy + j * this.py
                        orr.distans=dd                            
                    }
                       
                }
            }


            return orr
        }
        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };


        this.setCurves = function(c, c1, c2, c3) {
            this.arrCurve.push(c, c1, c2, c3)
        }



        let gg=0.2
        this.upDate = function() {

            for (i = 0; i < kol; i++) {
                t = this.sx + i * this.px                   
                this.arrCurve[0].getPoint(t, this.arrVect[i][0])
                this.arrCurve[1].getPoint(t, this.arrVect[i][kol-1])
                t = this.sy + i * this.py                   


                this.arrCurve[2].getPoint(t, this.arrVect[0][i])
                this.arrCurve[3].getPoint(t, this.arrVect[kol-1][i])

               
            }

            
            //this.upDIJ(1,1);
            
            //for (i = 1; i < kol1; i++) {
              // this.upDIJ(i,1);
            //}
            for (i = 1; i < kol1; i++) {
                for (j = 1; j < kol1; j++) {


                   this.upDIJ(i,j);
                }               
            }
       
            for (i = 0; i < kol; i++) {
                for (j = 0; j < kol; j++) {
                    this.arrUV[i][j].x=i/kol1*(1/(this.p1-1))*this.par.par._scaleTexterX+this.p1z*this.par.par._scaleTexterX
                    this.arrUV[i][j].y=j/kol1*(1/(this.p3-1))*this.par.par._scaleTexterY +this.p3z*this.par.par._scaleTexterY  
                }               
            }



            /*let ss=0
            for (i = 0; i < kol; i++) {
                for (j = 0; j < kol; j++) {
                    ss=(i+j+1)*0.2;
                    this.arrAxes[i][j].scale.set(ss,ss,ss)
                }
            }*/


        }

        this.arrVV=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()]

        let sss=0
        let tx,tx1,ty,ty1,iii
        let point = new THREE.Vector3();
        let pp = new THREE.Vector3()
        let pp1 = new THREE.Vector3()
        let pp2 = new THREE.Vector3()
        let pp3 = new THREE.Vector3()      
        this.upDIJ = function(ii,jj) {

           

            
            
            
           
            tx1 = ii/kol1
            tx=1-tx1
            pp.x=this.arrVect[0][jj].x*tx+this.arrVect[kol1][jj].x*tx1
            pp.y=this.arrVect[0][jj].y*tx+this.arrVect[kol1][jj].y*tx1
            pp.z=this.arrVect[0][jj].z*tx+this.arrVect[kol1][jj].z*tx1


            point.x=pp.x
            point.y=pp.y
            point.z=pp.z
            this.arrVect[ii][jj].set(point.x,point.y,point.z)

           // return



            ty = (jj)/kol1
            ty1 = 1-ty
            iii=ii
            pp1.x=this.arrVect[iii][0].x*ty1+this.arrVect[iii][kol1].x*ty
            pp1.y=this.arrVect[iii][0].y*ty1+this.arrVect[iii][kol1].y*ty
            pp1.z=this.arrVect[iii][0].z*ty1+this.arrVect[iii][kol1].z*ty

            point.x=pp1.x
            point.y=pp1.y
            point.z=pp1.z
            this.arrVect[ii][jj].set(point.x,point.y,point.z)

           // return



        

            point.x=(pp.x+pp1.x)/2
            point.y=(pp.y+pp1.y)/2
            point.z=(pp.z+pp1.z)/2
            this.arrVect[ii][jj].set(point.x,point.y,point.z)

         
         
        }

    }
}
import { PhBlok } from './PhBlok.js';
export class OWord {
    constructor(par, fun) {
        this.type = "OWord";
        var self = this;
        this.par = par;

        this.pause = false

        this.height = 122
        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        
        window.oWord = this


        this.array = []
        this.arrayChesh = []

        this.baxGeom = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3)
        this.cylinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 4);
        this.coneGeom = new THREE.CylinderGeometry(0, 0.5, 1, 24, 4);
        this.planGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
        this.sphereGeometry = new THREE.SphereGeometry(0.5, 36, 36)

        this.margin = 0.05;
        this.scalePh = 0.5;

        this.mat0 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x00ff00 })
        this.mat1 = new THREE.MeshPhongMaterial({ wireframe: true, color: 0x0000ff })

        this._debug = false
        this.metod = new Metod(this)
        this.mJoint = new MJoint(this)

        this.phNiz = null
        const gravityConstant = -9.8; //-1//
        let transformAux1;
        this.init = function() {
            this.physicsWorld = new OIMO.World()
            this.physicsWorld.gravity = new OIMO.Vec3(0, gravityConstant, 0)
            this.phNiz = oWord.setOToBody({ mass: 0, arrShepes: [] })
        }


        this.dragGraviti = function() {
            let r = 9.8
            this.vec.x = Math.random() * r * 2 - r
            this.vec.y = r / 2 + Math.random() * r / 2
            this.vec.z = Math.random() * r * 2 - r
            this.tween.to({ x: 0, y: gravityConstant, z: 0 }, 1500).start()
        }



        this.activDinam = function() {
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].obj.mass != 0) {
                    this.array[i].body.wakeUp();
                }
            }
        }



        ////////
        this.sob = function(s, p) {

        }


        this.setOToBody = function(o) {
            var body
            body = new PhBlok(this, this.sob)
            body.start(o)
            this.arrayChesh.push(body);
            return body
        }


        this.add = function(blok) {
            if (!blok) return null
            if (blok.type == undefined) return null
            if (blok.type != "PhBlok") return null
            this.remove(blok)
            blok.idArr = this.array.length
            this.array.push(blok);
            blok.active = true;
            trace("ggggggggg",blok)
            return blok
        }

        this.remove = function(blok) {
            if (!blok) return null
            if (blok.type == undefined) return null
            if (blok.type != "PhBlok") return null
            var p = -1;
            var r = null;

            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].uuid == blok.uuid) {
                    p = i;
                }
            }
            if (p != -1) {
                blok.idArr = -1
                r = this.array.splice(p, 1)[0];
                r.active = false;
                blok.body._jointLinkList = null               
            }
            visi3D.intRend = 1
            return r; 
        }


       /* this.sehWord = 0
        let speed = 12;
        this.upDate = function() {
            if (this.pause === true) return
            this.physicsWorld.step(1 / speed);
            this.physicsWorld.step(1 / speed);
            for (let ii = 0; ii < this.array.length; ii++) {
                this.array[ii].upDate()
            }
            this.activDinam()
            this.sehWord++
        }*/
        this.kol = 8
        this.sehWord = 0
        let speed = 64//12//;
        let iii=0
        this.upDate = function() {
       
            if (this.pause === true) return
           
            for (iii = 0; iii < this.kol; iii++) {
                this.physicsWorld.step(1 / speed);
            }


            for (iii = 0; iii < this.array.length; iii++) {
                this.array[iii].upDate()
            }
            this.activDinam()
            this.sehWord++
        }




    }
    set debug(v) {
        if (this._debug != v) {
            this._debug = v;
            for (let ii = 0; ii < this.array.length; ii++) {
                this.array[ii].debug = v;
            }
        }
    }
    get debug() { return this._debug; }
}


export class MJoint {
    constructor(par, fun) {
        this.type = "MJoint";
        var self = this;
        this.par = par;
        this.arrayAll = []
        this.add = function(joint) {
            if (joint == undefined) return
            if (joint.usWord !== undefined) return
            if (joint._b1 == undefined) return
            oWord.physicsWorld.addJoint(joint);
            joint.usWord = oWord
        }

        this.remove = function(joint) {
            if (joint == undefined) return
            if (joint.usWord == undefined) return null
            //return    
            oWord.physicsWorld.removeJoint(joint);
            joint.usWord = undefined
            return joint
        }
        let bbb
        this.jointInBody = function(joint, body) {
            if (joint._b1) {
                if (joint._b1.uuid != body.uuid) {
                    bbb = true
                    if (joint._world == null) bbb = false
                    if (bbb) this.remove(joint)
                    let bb = joint._b1
                    joint._b1 = body
                    if (bbb) this.add(joint)


                }
            } else {
                bbb = true
                if (joint._world == null) bbb = false
                if (bbb) this.remove(joint)
                joint._b1 = body

                if (bbb) this.add(joint)
            }
        }
        this.jointInBody1 = function(joint, body) {
            this.jointInBody(joint, body)
        }


        
        this.jointInBody2 = function(joint, body) {
            
            if (body && joint._b2) {
                
                if ( joint._b2.uuid != body.uuid) {
                    bbb = true
                    if (joint._world == null) bbb = false
                    if (bbb) this.remove(joint)
                    let bb = joint._b2
                    joint._b2 = body
                    if (bbb) this.add(joint)
                }

            } else {
                
                bbb = true
                if (joint._world == null) bbb = false
                if (bbb) this.remove(joint)
                
                joint._b2 = body
                if (bbb) this.add(joint)
            }
        }


        var sp;
        this.setPositionJoint = function(joint, x, y, z, _sp) {
            sp = 2;
            if (_sp) sp = _sp
            
            joint["_localAnchor" + sp + "X"] = x
            joint["_localAnchor" + sp + "Y"] = y            
            joint["_localAnchor" + sp + "Z"] = z

            if (joint.userData){
                if (joint.userData.jc) {
                    joint.userData.jc["localAnchor" + sp].x = x
                    joint.userData.jc["localAnchor" + sp].y = y
                    joint.userData.jc["localAnchor" + sp].z = z
                }

                if (sp == 1) {
                    if (joint.userData.c3d) {
                        joint.userData.c3d.position.set(x, y, z);
                    }
                }
            }

            
        }


    }
}







export class Metod {
    constructor(par, fun) {
        this.type = "Metod";
        var self = this;
        this.par = par;


        /////////////////////////////////////////////////////////////
        //------------------------------------------------------------
        let bnm
        this.stopOre = function(b,a) {
           
            for (var i = 0; i < this.par.array.length; i++) {
                bnm=true;
                if(a)
                for (var j= 0; j < a.length; j++) {
                    if(this.par.array[i].uuid==a[j].uuid)bnm=false
                }

                if(bnm)this.stopBlok(b,this.par.array[i])
            }
        }

        this.stopBlok = function(b, blok) {
           

            if(blok.mass!=0){  
                if(b){
                    if(blok.oldObj==undefined){
                        blok.oldObj={}
                        blok.oldObj._invMass=blok.body._invMass;
                        blok.oldObj._mass=blok.body._mass;
                        blok.oldObj._type=blok.body._type;
                    }
                    blok.body._invMass=0;
                    blok.body._mass=8000000000;
                    blok.body._type=1;
                }else{
                    if(blok.oldObj!==undefined){
                        blok.body._invMass=blok.oldObj._invMass
                        blok.body._mass=blok.oldObj._mass
                        blok.body._type=blok.oldObj._type
                    }
                } 
            }
        }

        //////////////////////////////////////////////////

        this.content3d = new THREE.Object3D();

        this.par.par.par.content3d.add(this.content3d);

        var go0 = new THREE.Object3D();
        this.content3d.add(go0)
        var go0Na = new THREE.Object3D();
        go0.add(go0Na);

        let qOt = new THREE.Quaternion()
        let q = new THREE.Quaternion()
        let q1 = new THREE.Quaternion()
        let v = new THREE.Vector3()
        let vvPO = new THREE.Vector3()
        let vwp0 = new THREE.Vector3()
        let vwp1 = new THREE.Vector3()
        ///Возвращает обьект с позицие с0 в мировых координатах
        this.getLocal = function(c0, c1) {
            c1.getWorldQuaternion(q1)
            go0.position.copy(c0.position) //ставим в обьект от
            c0.getWorldPosition(vwp0) //ищем мировые координаты от
            c1.getWorldPosition(vwp1) //ищем мировые координаты кого  
            v.x = vwp1.x - vwp0.x
            v.y = vwp1.y - vwp0.y
            v.z = vwp1.z - vwp0.z //ищем смещение в ноль       
            go0Na.position.copy(v) //смещаем от 
            go0.position.set(0, 0, 0); //смещаем в ноль мира 
            //go0Na.quaternion.copy(c1.quaternion)//поворачиваем как обьект   
            go0Na.quaternion.copy(q1) //поворачиваем как обьект   

            q.copy(c0.quaternion)
            q.invert()
            go0.quaternion.copy(q) //возможно инверттировать!!!!!!!!!!!!
            go0.position.set(0, 0, 0);
            vvPO = go0Na.getWorldPosition(vvPO)
            go0Na.getWorldQuaternion(q1)
            var o3dReturn = new THREE.Object3D();
            o3dReturn.position.copy(vvPO)
            o3dReturn.quaternion.copy(q1)
            return o3dReturn;
        }

        var pNull = new OIMO.Vec3()
        var qNull = new OIMO.Quat()

        this.getWHDLocalInBlok = function(blok, _pz) {
            let pw = blok.getPosition()
            let qw = blok.getRotation()
            let pz = pNull
            if (_pz) pz = _pz
            this.debug = this.par.debug
            blok.setPosition(pz)
            blok.setRotation(qNull)

            //if(self.debug==true)
            this.visiShaps(blok.content3d, true)

            let rez = this.getCompoundBoundingBox(blok.content3d)
            if (self.debug != true) {
                this.visiShaps(blok.content3d, false)
            }
            blok.setPosition(pw)
            blok.setRotation(qw)
            return rez
        }

        this.visiShaps = function(c3d, b) {
            if (c3d.boolShepe) {
                c3d.visible = b

            }
            if (c3d.children) {
                for (var i = 0; i < c3d.children.length; i++) {
                    this.visiShaps(c3d.children[i], b)
                }
            }
        }


        this.getCompoundBoundingBox = (function() {
            var box3 = new THREE.Box3();
            var boundingBox = new THREE.Box3();
            function traverseBound(node) {
                if (node.boolShepe === undefined) return;
                var geometry = node.geometry;
                if (geometry === undefined) return;
                if (!geometry.boundingBox) geometry.computeBoundingBox();


                boundingBox.copy(geometry.boundingBox);
                boundingBox.applyMatrix4(node.matrixWorld);
                box3.union(boundingBox);
            }
            return function(object) {
                object.updateMatrixWorld(true);
                box3.makeEmpty();
                object.traverseVisible(traverseBound);
                return box3;
            };
        }());


        var qqq0 = new THREE.Object3D();
        this.content3d.add(qqq0)

        var qqq1 = new THREE.Object3D();
        qqq0.add(qqq1)
        var rezq = new THREE.Quaternion()
        this.getQQQ = function(q, _q1) {
            qqq0.quaternion.copy(q)
            qqq1.quaternion.copy(_q1)
            qqq1.getWorldQuaternion(rezq)
            return rezq
        }


        this.generateRendom = function(n) {
            if (n == undefined) n = 2;
            let s = '';
            let s1 = '';
            let d0;
            for (var i = 0; i < n; i++) {
                d0 = Math.random() * 0xffffffff | 0;
                s1 = (d0 & 0xff).toString(16) + (d0 >> 8 & 0xff).toString(16) + (d0 >> 16 & 0xff).toString(16) + (d0 >> 24 & 0xff).toString(16)
                if (s1.length < 8) {
                    for (var j = 0; j < 8 - s1.length + 1; j++) {
                        s1 += "Z";
                    }
                }
                s += s1
                if (i != n - 1) s += "-";
            }
            return s
        }

        ///Выравнивает по углу от первого/////////////////////////////
        ///////////////////////////////////////////////////////////////\
        let _transform, _position, _rotation
        let q0, _shepe, _diss, c3d
        var qDin = new THREE.Quaternion()
        let otR
        this.korAngelShapes = function(bhBlok) {
            if (bhBlok.arrShepes[0] == undefined) {
                return
            }
            _shepe = bhBlok.arrShepes[0]
            qDin.set(_shepe.c3d.quaternion.x, _shepe.c3d.quaternion.y, _shepe.c3d.quaternion.z, _shepe.c3d.quaternion.w)
            _diss = medod3D.roundQuaternion(qDin, Math.PI / 2)
            if (_diss < 0.0000001) return
            _transform = _shepe.getTransform();
            _position = _transform.getPosition()
            _position.x = _shepe.c3d.position.x;
            _position.y = _shepe.c3d.position.y;
            _position.z = _shepe.c3d.position.z //+3;


            _shepe.c3d.quaternion.set(qDin.x, qDin.y, qDin.z, qDin.w)
            _rotation = new OIMO.Quat(qDin.x, qDin.y, qDin.z, qDin.w)
            _transform.setOrientation(_rotation)
            _shepe.c3d.position.set(_position.x, _position.y, _position.z);
            _transform.setPosition(_position);
            _shepe.setLocalTransform(_transform);
            c3d = _shepe.phBlok.hron.content3d
            c3d.position.x = _position.x;
            c3d.position.y = _position.y;
            c3d.position.z = _position.z 
            if (bhBlok.arrShepes[1] == undefined) {
                return
            }
            medod3D.setPosRot(_position, qDin)

            for (var i = 1; i < bhBlok.arrShepes.length; i++) {
                medod3D.setPosRot0(bhBlok.arrShepes[i].oInfo.p, bhBlok.arrShepes[i].oInfo.q)
                otR = medod3D.getPosRot0()
                _transform = bhBlok.arrShepes[i].getTransform();
                _position = _transform.getPosition();
                _transform.setOrientation(otR.q)
                _transform.setPosition(otR.p);
                bhBlok.arrShepes[i].setLocalTransform(_transform);
            }
        }





        //Уберает инерции///////////////////////
        var impulseNull = new OIMO.Vec3(0, 0, 0)
        this.stopImpuls = function(body) {
            body.applyLinearImpulse(impulseNull)
            body.setAngularVelocity(impulseNull)
            body.setLinearVelocity(impulseNull)
        }


    }
}
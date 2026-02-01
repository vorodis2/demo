


export class PBHron {
    constructor(par, fun) {
        this.type = "PBHron";
        this.uuid = calc.generateRendom()
        var self = this;
        this.par = par;
        this.fun = fun;
        this._parent = undefined
        this.array = []
        this.idArrCesh = -1

        this.position = new THREE.Vector3();
        this.arrShepesAll = []
        this.arrShepesDin = []
        this.c3dShapes = new THREE.Object3D();
        this.par.content3d.add(this.c3dShapes);
        this.c3dC3 = new THREE.Object3D();
        this.par.content3d.add(this.c3dC3);
        this.content3d = new THREE.Object3D();
        this.c3dC3.add(this.content3d);

        this._center = false;
        this.metodPBH = new MetodPBH(this)
        /////////////////////////////////////////////////
        let dinShape, p1
        this.arrShAll = []
        this.arrJoint = []
        this.addShapes = function(shape, p, q) {
            if (shape.hron != undefined) {
                shape.hron.removeShapes(shape)
            }
            let pw = this.par.getPosition()
            let qw = this.par.getRotation()
            this.par.setPosition(pNull)
            this.par.setRotation(qNull)
            if (p || q) {
                this.setShepesPQ(shape, p, q);
            }

            this.par.body.addShape(shape);
            this.c3dShapes.add(shape.c3d);
            this.arrShAll.push(shape);

            this.par.setPosition(pw)
            this.par.setRotation(qw)
            shape.hron = this;
            return shape
        }


        let dh
        this.removeShapes = function(shape) {
            if (shape.hron == undefined) return null
            dh = shape.hron
            let p = -1;
            for (var i = 0; i < dh.arrShAll.length; i++) {
                if (dh.arrShAll[i].uuid == shape.uuid) {
                    p = i;
                    break;
                }
            }
            if (p != -1) dh.arrShAll.splice(p, 1)
            dh.par.body.removeShape(shape);
            shape.hron = undefined
            return shape
        }


        this.addJoint = function(joint, body) {
            let p = -1;
            for (var i = 0; i < this.arrJoint.length; i++) {
                if (this.arrJoint[i].uuid == joint.uuid) p = i
            }
            if (joint.userData.parentPHB != null) joint.userData.parentPHB.hron.removeJoint(joint)
            if (p == -1) {
                this.c3dShapes.add(joint.userData.c3d);
                this.par.par.mJoint.jointInBody(joint, this.par.body);
                this.arrJoint.push(joint);
                joint.userData.parentPHB = this.par;
            }
        }


        this.removeJoint = function(joint) {
            let p = -1;
            for (var i = 0; i < this.arrJoint.length; i++) {
                if (this.arrJoint[i].uuid == joint.uuid) p = i
            }
            if (p !== -1) {
                joint.userData.phBlok.hron.c3dShapes.add(joint.userData.c3d);
                this.par.par.mJoint.jointInBody(joint, joint.userData.phBlok.body);
                this.arrJoint.splice(p, 1);
                joint.userData.parentPHB = null;
            }
        }


        //проверка левых джоинтов, при удалении
        this.clearIsJoints = function() {
            this.redragArray()
            let a = []
            for (var i = 0; i < this.arrJoint.length; i++) {
                a[i] = this.arrJoint[i]
            }
            for (var i = 0; i < a.length; i++) {
                this.removeJoint(a[i])
            }
        }


        let bb
        this.redragArray = function() {
            this.par.array.length = 0
            for (var i = 0; i < this.arrShAll.length; i++) {
                bb = true
                for (var j = 0; j < this.par.array.length; j++) {
                    if (this.arrShAll[i].phBlok.uuid == this.par.array[j].uuid) {
                        bb = false
                        j = 999
                    }
                }
                if (bb) this.par.array.push(this.arrShAll[i].phBlok)
            }
        }


        ///центровка обьект от _center
        this.dragCenter = function() {
            let pw = this.par.getPosition()
            let qw = this.par.getRotation()
            this.par.setPosition(pNull)
            this.par.setRotation(qNull)

            if (this._center == true) {
                let sMass = 0
                for (var i = 0; i < this.arrShAll.length; i++) {
                    _transform = this.arrShAll[i].getTransform();
                    _position = _transform.getPosition()
                    this.arrShAll[i].vectPosition.set(_position.x, _position.z, _position.y)
                    sMass += this.arrShAll[i].sMass;
                }

                let vm2 = new THREE.Vector3(0, 0, 0);
                for (var i = 0; i < this.arrShAll.length; i++) {
                    dinShape = this.arrShAll[i]
                    vm2.x += dinShape.vectPosition.x * (dinShape.sMass / sMass)
                    vm2.y += dinShape.vectPosition.y * (dinShape.sMass / sMass)
                    vm2.z += dinShape.vectPosition.z * (dinShape.sMass / sMass)
                }

                vm2.x *= -1;
                vm2.y *= -1;
                vm2.z *= -1;
                this.position.set(vm2.x, vm2.z, vm2.y)
                this.c3dC3.position.set(vm2.x, vm2.z, vm2.y)

                for (var i = 0; i < this.arrShAll.length; i++) {
                    this.setShepesSmeshnie(this.arrShAll[i], vm2)
                }
                let vm3 = new THREE.Vector3(-vm2.x, -vm2.z, -vm2.y);
                let q3 = new THREE.Quaternion(qw.x, qw.y, qw.z, qw.w);
                vm3.applyQuaternion(q3)
                pw.x += vm3.x;
                pw.y += vm3.y;
                pw.z += vm3.z;
            } else {
                let vm2 = new THREE.Vector3(-this.position.x, -this.position.z, -this.position.y);
                for (var i = 0; i < this.arrShAll.length; i++) {
                    this.setShepesSmeshnie(this.arrShAll[i], vm2)
                }
                this.position.set(0, 0, 0)
                this.c3dC3.position.set(0, 0, 0)
                let vm3 = new THREE.Vector3(-vm2.x, -vm2.z, -vm2.y);
                let q3 = new THREE.Quaternion(qw.x, qw.y, qw.z, qw.w);
                vm3.applyQuaternion(q3)
                pw.x += vm3.x;
                pw.y += vm3.y;
                pw.z += vm3.z;
            }
            this.metodPBH.inapesAll()
            this.par.setPosition(pw)
            this.par.setRotation(qw)
        }
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////

        let dinObj, dinObj1, cPos
        let ona = {
            p: new THREE.Vector3(),
            q: new THREE.Quaternion(),
        }
        var pNull = new OIMO.Vec3()
        var qNull = new OIMO.Quat()

        var dinPhBlok
        this.add = function(phBlok, c3Pos, inBlok) {
            this.center = false
            if (this.isParentHave(phBlok, c3Pos) == true) {
                return phBlok
            }
            phBlok.hron.center = false
            cPos = phBlok.content3d
            if (c3Pos) cPos = c3Pos
            dinObj = this.par.par.metod.getLocal(this.par.content3d, cPos)
            phBlok.hron.content3d.position.copy(dinObj.position);
            phBlok.hron.content3d.quaternion.copy(dinObj.quaternion);
            this.c3dC3.add(phBlok.hron.content3d)
            this.c3dC3.add(phBlok.hron.c3dShapes)
            phBlok.hron.c3dShapes.position.copy(dinObj.position);
            phBlok.hron.c3dShapes.quaternion.copy(dinObj.quaternion);


            for (var i = phBlok.hron.arrShAll.length - 1; i >= 0; i--) {
                dinObj1 = this.par.par.metod.getLocal(this.par.content3d, phBlok.hron.arrShAll[i].c3d)
                ona.p = dinObj1.position;
                ona.q = dinObj1.quaternion
                dinShape = phBlok.hron.arrShAll[i]
                this.addShapes(dinShape, dinObj1.position, dinObj1.quaternion)
            }

            this.metodPBH.inapesAll()

            phBlok.hron.par.content3d.add(phBlok.hron.c3dShapes)
            phBlok.hron.parent = inBlok.hron;
            inBlok.hron.array.push(phBlok);
            this.center = true;

            let b = false;
            if (phBlok.hron.arrJoint.length != 0) b = true;
            //////////joint////////////
            for (var i = phBlok.hron.arrJoint.length - 1; i >= 0; i--) {
                this.addJoint(phBlok.hron.arrJoint[i]);
            }
            if (b) this.metodPBH.inapesAll()
            ////////////////////////////
            this.redragArray()
            return phBlok
        }


        let parDin
        this.remove = function(phBlok) {
            phBlok.hron.center = false;
            parDin = this.getPatent(phBlok).par;
            phBlok.setPosition(parDin.getPosition())
            phBlok.setRotation(parDin.getRotation())

            phBlok.hron.c3dC3.position.copy(parDin.hron.c3dC3.position);
            phBlok.hron.c3dShapes.position.copy(parDin.hron.c3dShapes.position);
            phBlok.hron.c3dShapes.quaternion.copy(parDin.hron.c3dShapes.quaternion);
            phBlok.hron.position.copy(parDin.hron.c3dShapes.position);

            this.rSS(phBlok, phBlok, phBlok)

            phBlok.body.setType(phBlok.bodyConfig.type)
            phBlok.hron.parent = undefined;
            phBlok.body.wakeUp()

            phBlok.hron.center = true
            for (var i = 0; i < phBlok.hron.arrShAll.length; i++) {
                if (phBlok.hron.arrShAll[i].idArr == 0) {
                    phBlok.hron.metodPBH.inToPoistionSapesForst(phBlok.hron.arrShAll[i]);
                }
            }

            parDin.hron.center = false
            parDin.hron.center = true

            this.redragArray()
            return phBlok
        }


        //phBlok-его удоляем
        //inBlok-в него вкладываем шейпы
        this.rSS = function(phBlok, inBlok, parBlok) {

            for (var i = 0; i < phBlok.arrShepes.length; i++) {
                let shape = phBlok.arrShepes[i]
                phBlok.hron.removeShapes(shape)
                inBlok.body.addShape(shape);
                inBlok.hron.c3dShapes.add(shape.c3d);
                inBlok.hron.arrShAll.push(shape);
                shape.hron = inBlok.hron;
            }
            inBlok.hron.c3dC3.add(phBlok.hron.content3d);

            ///joint----------------------------
            for (var i = 0; i < phBlok.arrayJoint.length; i++) {
                inBlok.hron.addJoint(phBlok.arrayJoint[i]);
            }
            ///из родителя вырываем----------------------------
            let p = -1;
            let ph = phBlok.hron.parent //из родителя вырываем            
            for (var i = 0; i < ph.array.length; i++) {
                if (ph.array[i].uuid == phBlok.uuid) {
                    p = i
                }
            }
            if (p != -1) {
                ph.array.splice(p, 1)

            }
            //-------------------------------------------

            if (phBlok.uuid != inBlok.uuid) {
                parBlok.hron.array.push(phBlok)
                phBlok.hron.parent = parBlok.hron
            }

            let a = []
            for (var i = 0; i < phBlok.hron.array.length; i++) {
                a[i] = phBlok.hron.array[i];
            }

            for (var i = 0; i < a.length; i++) {
                this.rSS(a[i], inBlok, phBlok)
            }
        }


        let rHron
        this.getPatent = function(phBlok, sah) {
            if (sah == undefined) sah = 0
            rHron = this;

            if (sah >= 512) {
                console.error("~~!!!!!!!!Дохуя связей, рекурсия!!!!!!!~", sah)
                return rHron
            } 
            if (this.parent != undefined) {
                return this.parent.getPatent(phBlok, sah + 1)
            }
            return rHron
        }


        ///Сливание веток
        this.isParentHave = function(phBlok, c3Pos) {
            return this.metodPBH.isParentHave(phBlok, c3Pos)
        }

        this.clearStart = function() {
            if (
                this.content3d.quaternion.x != 0 ||
                this.content3d.quaternion.y != 0 ||
                this.content3d.quaternion.z != 0 ||
                this.content3d.quaternion.w != 1
            ) {
                for (var i = 0; i < this.par.arrShepes.length; i++) {
                    this.par.shapeForstPosition(this.par.arrShepes[i])
                }
                this.metodPBH.inapesAll();
            }
        }


        let _transform, _position, _position1, _rotation
        this.setShepesPQ = function(shepe, _p, _q) {
            _transform = shepe.getTransform();
            _position = new OIMO.Vec3(0, 0, 0)
            _rotation = new OIMO.Quat(0, 0, 0, 1)

            if (_p) {
                _position.x = _p.x;
                _position.y = _p.y;
                _position.z = _p.z;
            }
            if (_q) {
                _rotation.x = _q.x;
                _rotation.y = _q.y;
                _rotation.z = _q.z;
                _rotation.w = _q.w;
            }

            shepe.c3d.position.set(_position.x, _position.y, _position.z);
            _transform.setPosition(_position)
            shepe.c3d.quaternion.set(_rotation.x, _rotation.y, _rotation.z, _rotation.w);
            _transform.setOrientation(_rotation)
            shepe.setLocalTransform(_transform)
        }


        this.setShepesSmeshnie = function(shepe, v3) {
            
            

            _transform = shepe.getTransform();
            _position = _transform.getPosition()
            _position = new OIMO.Vec3(_transform._positionX + v3.x, _transform._positionY + v3.z, _transform._positionZ + v3.y)
            shepe.c3d.position.set(_position.x, _position.y, _position.z);
            _transform.setPosition(_position);
            shepe.setLocalTransform(_transform);

            if(shepe.idArr===0){
                if(shepe.phBlok){                    
                    if(shepe.phBlok.blokDin)
                    if(shepe.phBlok.blokDin.upShepe0){                        
                        shepe.phBlok.blokDin.upShepe0()
                    }
                }
                
            }
        }
    }
    set parent(v) {
        if (this._parent !== v) {
            this._parent = v;
        }
    }
    get parent() { return this._parent; }

    set center(v) {
        if (this._center !== v) {
            this._center = v;
            this.dragCenter()
        }
    }
    get center() { return this._center; }
}



export class MetodPBH {
    constructor(par, fun) {
        this.type = "MetodPBH";
        this.uuid = calc.generateRendom()
        var self = this;
        this.par = par;
        this.fun = fun;


        let jj
        this.redrag = function() {
            if (this.par.par.active == false) {
                return
            }
            let aj1 = []
            let aj = []
            for (var i = 0; i < this.par.arrJoint.length; i++) {
                aj[i] = this.par.arrJoint[i]
            }

            for (var i = aj.length - 1; i >= 0; i--) {
                jj = oWord.mJoint.remove(aj[i])
                if (jj) aj1.push(jj)
            }

            this.par.par.par.remove(this.par.par)
            this.par.par.par.add(this.par.par)
            for (var i = aj1.length - 1; i >= 0; i--) {
                oWord.mJoint.add(aj1[i])
            }
        }


        this.inapesAll = function() {
          //  trace("iii",i,this.par.arrShAll)
            for (var i = 0; i < this.par.arrShAll.length; i++) {
                if (this.par.arrShAll[i].idArr == 0) {
                    this.inToPoistionSapesForst(this.par.arrShAll[i]);

                    //trace("iii",i,this.par.arrShAll[i])
                }
            }
        }









        var c3d, parentError
        var qu = new THREE.Quaternion()
        this.inToPoistionSapesForst = function(shape) {
            //проверка на а там ли сонтент
            c3d = shape.phBlok.hron.content3d
            parentError = false;
            if (!c3d.parent) {
                parentError = true
            } else {
                if (c3d.parent.uuid !== this.par.c3dC3.uuid) {
                    parentError = true
                }
            }

            if (parentError) {
                this.par.c3dC3.add(c3d)
            }

            c3d.position.copy(shape.c3d.position)
            c3d.position.x -= this.par.position.x;
            c3d.position.y -= this.par.position.y;
            c3d.position.z -= this.par.position.z;

            qu.copy(shape.c3d.quaternion)
            
            //trace("position==", c3d.position, this.par.position)
            this.inJointBlok(shape.phBlok, shape.c3d.position, qu);
            c3d.quaternion.copy(qu);
        }

        ///Проверка позиций шейпов от первого/////////////////////////////////
       
        this.isAllPAR = function() {            
            let aa=this.par.par.arrShepes;   
            for (var i = 1; i < aa.length; i++) { 
                if(this.isSapesForst(aa[0], aa[i]) ==true) return true;
            }
            return false;
        }
        this.isSapesForst = function(_shape0,_shapeI) {
            let d=this.getDistance3d(_shape0.c3d.position, _shapeI.c3d.position)
            let d1=Math.abs(d-_shapeI.distanceForst)
            if( d1>0.01){//контейнер не на том месте, как минимум по дистанции                
                //trace("_shape0",d,d1,_shapeI.distanceForst, _shapeI.c3d.position)
                return true;
            }
            return false;         
        }


        this.korectAllPAR = function() { 
            let aa=this.par.par.arrShepes;   
            for (var i = 1; i < aa.length; i++) { 
               this.korectSapesForst(aa[0], aa[i])
            }
        }
        let pp=new THREE.Vector3()
        let pp1=new THREE.Vector3()
        this.korectSapesForst = function(_shape0,_shapeI) {
            
            pp.x=_shape0.c3d.position.x;
            pp.y=_shape0.c3d.position.y;
            pp.z=_shape0.c3d.position.z;

            pp1.x=_shapeI.positionStart.x;
            pp1.y=_shapeI.positionStart.y;
            pp1.z=_shapeI.positionStart.z;


            //. setFromEuler (
            //. transformDirection ( m : Matrix4 ) : это
            //. applyEuler ( euler : Эйлер ) : это
            //. applyQuaternion ( кватернион : кватернион ) : это
            pp1.applyQuaternion(_shape0.c3d.quaternion)

            pp.x+=pp1.x;
            pp.y+=pp1.y;
            pp.z+=pp1.z;



            this.par.setShepesPQ(_shapeI, pp)     
        }



        this.getDistance3d = function (p1, p2) {           
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };

        //////////////////////////////////////////////////////////////////////


        this.inJointBlok = function(phBlok, position, quaternion) {
            for (var i = 0; i < phBlok.arrayJoint.length; i++) {
                this.inJoint(phBlok.arrayJoint[i], position, quaternion)
            }
        }


        var v3t = new THREE.Vector3()
        var v3t1 = new THREE.Vector3()
        this.inJoint = function(joint, position, quaternion) {
            v3t.set(joint.userData.postStart.x, joint.userData.postStart.y, joint.userData.postStart.z)
            v3t.applyQuaternion(quaternion);
            v3t1.x = position.x + v3t.x;
            v3t1.y = position.y + v3t.y;
            v3t1.z = position.z + v3t.z;
            joint.userData.phBlok.setPositionJoint(joint, v3t1.x, v3t1.y, v3t1.z, 1)
        }


        let vwp0 = new THREE.Vector3()
        let vwp1 = new THREE.Vector3()
        let vwp2 = new THREE.Vector3()
        let vwpIn = new THREE.Vector3(300, 100, 300)
        let q0 = new THREE.Quaternion()
        let q1 = new THREE.Quaternion()
        let q2 = new THREE.Quaternion()
        ///Сливание веток
        var dinb, dinb1
        this.isParentHave = function(phBlok, c3Pos) {
            dinb = phBlok.hron.getPatent(phBlok).par
            dinb1 = this.par.getPatent(this.par.par).par



            if (dinb.uuid != phBlok.uuid) {
                dinb.hron.center = false //зануляем               
                vwp0.copy(phBlok.hron.content3d.position) //берем               
                this.zdvigXYZ(dinb.hron, -vwp0.x, -vwp0.z, -vwp0.y, true) //перемещяем центр в обьект привязки
                dinb.hron._center = true //не дергаем и не центруем

                q2.copy(phBlok.hron.content3d.quaternion)
                q2.invert()
                // dinb.setPosition(vwpIn);
                dinb.setRotation(q2)

                dinb1.hron.center = false
                let qw = dinb1.getRotation()
                let qwppp = dinb1.getPosition()
                dinb1.hron.center = true

                dinb1.setRotation(qNull);
                c3Pos.getWorldQuaternion(q2);
                q2.invert()
                dinb1.setRotation(q2)

                c3Pos.getWorldPosition(vwp0)
                dinb.content3d.getWorldPosition(vwp1)
                vwp2.x = vwp0.x - vwp1.x;
                vwp2.y = vwp0.y - vwp1.y;
                vwp2.z = vwp0.z - vwp1.z;
                let pw = dinb.getPosition()
                pw.x += vwp2.x;
                pw.y += vwp2.y;
                pw.z += vwp2.z;
                dinb.setPosition(pw);

                this.par.add(dinb, undefined, phBlok)
                this.inapesAll();
                dinb1.setRotation(qw)
                dinb1.hron.center = false
                dinb1.setPosition(qwppp)
                dinb1.hron.center = true
                return true;
            } 
            return false;
        }


        var pNull = new OIMO.Vec3();
        var qNull = new OIMO.Quat();
        let v3 = new THREE.Vector3(0, 0, 0);
        let v3m = new THREE.Vector3(0, 0, 0);
        let q3 = new THREE.Quaternion();
        this.zdvigXYZ = function(hron, x, y, z, bool) {
            let pw = hron.par.getPosition()
            let qw = hron.par.getRotation()
            hron.par.setPosition(pNull)
            hron.par.setRotation(qNull)

            v3.x = x;
            v3.y = y;
            v3.z = z;
            v3m.x = -x;
            v3m.y = -y;
            v3m.z = -z;

            q3.x = qw.x
            q3.y = qw.y
            q3.z = qw.z
            q3.w = qw.w

            if (bool != undefined) {
                hron.position.set(v3.x, v3.z, v3.y)
                hron.c3dC3.position.set(v3.x, v3.z, v3.y)
            }

            for (var i = 0; i < hron.arrShAll.length; i++) {
                hron.setShepesSmeshnie(hron.arrShAll[i], v3)
            }
            v3m.applyQuaternion(q3)
            pw.x += v3m.x;
            pw.y += v3m.y;
            pw.z += v3m.z;
            hron.par.setPosition(pw)
            hron.par.setRotation(qw)
        }


        //поворот оси
        this.rotationNull = function() {
            this.centorPosition()
            this.povorotQQ()
            this.par.center = true
        }


        let _v3 = new THREE.Vector3(0, 0, 0);
        let _q3 = new THREE.Quaternion();
        let _vector3 = new THREE.Vector3();
        let _vector31 = new THREE.Vector3();
        let _transform, _position, _position1, _rotation, shepe
        //смещаем в центор тело от хрона
        this.centorPosition = function() {
            let hron = this.par
            hron.center = false
            let vvv3 = new THREE.Vector3(0, 0, 0);
            _vector3.x = -(hron.c3dC3.position.x + hron.content3d.position.x)
            _vector3.y = -(hron.c3dC3.position.y + hron.content3d.position.y)
            _vector3.z = -(hron.c3dC3.position.z + hron.content3d.position.z)

            for (var i = 0; i < hron.arrShAll.length; i++) {
                shepe = hron.arrShAll[i]
                _position = shepe.c3d.position;
                _rotation = shepe.c3d.quaternion;
                _v3.set(_position.x, _position.y, _position.z)
                _q3.set(_rotation.x, _rotation.y, _rotation.z, _rotation.w)

                _v3.x += _vector3.x
                _v3.y += _vector3.y
                _v3.z += _vector3.z
                hron.setShepesPQ(hron.arrShAll[i], _v3, _q3)
            }
            this.inapesAll()


            let pw = hron.par.getPosition()
            let qw = hron.par.getRotation()

            _vector31.copy(_vector3)
            _vector31.applyQuaternion(qw)
            pw.x -= _vector31.x
            pw.y -= _vector31.y
            pw.z -= _vector31.z

            hron.par.setPosition(pw)
            hron.par.setRotation(qw)
        }


        let q3i = new THREE.Quaternion();
        this.povorotQQ = function() {
            let hron = this.par
            let pw = hron.par.getPosition()
            let qw = hron.par.getRotation()
            hron.par.setPosition(pNull)
            q3.copy(this.par.content3d.quaternion)
            q3i.copy(this.par.content3d.quaternion)
            q3i.invert()
            hron.par.setRotation(q3i)

            for (var i = 0; i < hron.arrShAll.length; i++) {
                shepe = hron.arrShAll[i]
                _position = shepe.c3d.position;
                _rotation = shepe.c3d.quaternion;
                shepe.c3d.getWorldQuaternion(_q3)
                _v3.set(_position.x, _position.y, _position.z)
                _v3.applyQuaternion(q3i)
                hron.setShepesPQ(hron.arrShAll[i], _v3, _q3)
            }
            this.inapesAll()

            _q3 = this.par.par.par.metod.getQQQ(qw, q3)
            hron.par.setPosition(pw)
            hron.par.setRotation(_q3)
        }


        ///////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////

        let parDin;
        var op = {}
        var rezObj = {
            inBody: null,
            izBody: null
        }
        //перекидываем структуру парента от парента
        this.inParent = function() {
            if (this.par.parent == undefined) {
                return null
            }

            parDin = this.par.getPatent(this.par.par).par;
            op = {}
            this.inp(parDin, op)
            rezObj.inBody = this.par.par;
            rezObj.izBody = parDin;
            let pw = parDin.getPosition()
            let qw = parDin.getRotation()
            this.par.position.copy(parDin.hron.position)
            this.par.c3dC3.position.copy(parDin.hron.c3dC3.position);

            let aa = []
            for (var i = parDin.hron.arrShAll.length - 1; i >= 0; i--) {
                aa[i] = parDin.hron.arrShAll[i];
            }

            for (var i = parDin.hron.arrShAll.length - 1; i >= 0; i--) {
                parDin.hron.removeShapes(parDin.hron.arrShAll[i])
            }

            for (var i = 0; i < aa.length; i++) {
                let shape = aa[i]
                this.par.par.body.addShape(shape);
                this.par.c3dShapes.add(shape.c3d);
                this.par.arrShAll.push(shape);
                shape.hron = this.par;

            }
            this.inapesAll()
            this.par.center = false
            this.par.center = true
            this.par.par.body.setType(1);
            this.par.par.setPosition(pw);
            this.par.par.setRotation(qw);
            this.par.parent = undefined
            return rezObj
        }

        this.inp = function(o, o1, p) {
            if (o1.array == undefined) o1.array = []
            o1.b = o.hron;
            o1.p = p;
            for (var i = 0; i < o.hron.array.length; i++) {
                o1.array[i] = {}
                this.inp(o.hron.array[i], o1.array[i], o1)
            }
        }
    }
}
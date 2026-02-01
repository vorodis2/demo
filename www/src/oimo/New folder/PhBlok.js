

import { PBHron } from './PBHron.js';
import { TLabel } from '../../../../t3d/TStyle.js';

export class PhBlok {
    constructor(par, fun) {
        this.type = "PhBlok";
        this.uuid = par.metod.generateRendom(1)
        this.idArrCesh = -1
        var self = this;
        this.par = par;
        this.fun = fun;
        this._active = false;
        this.blokDin = null
        this._debug = par._debug;
        this._boolStop=false
        this.uuid1 = 1
        this.content3d = new THREE.Object3D();
        this.c3dDeb = new THREE.Object3D();
        if (this._debug) {
            this.content3d.add(this.c3dDeb)
         
        }


        this.hron = new PBHron(this)
        this.array = []

        this.add = function(phBlok, c3Pos) {
            let hron = this.hron.getPatent(phBlok)
            return hron.add(phBlok, c3Pos, this)
        }

        let phh, rrr
        this.remove = function(phBlok) {
            rrr = this.hron.remove(phBlok);
            return rrr
        }


        var obom = 1
        this.shape
        var _shape
        this.boolHHH=false
        this.getShape = function(o, boolNot,ii) {

            if (o.notUsing && !boolNot) {
                return null
            }

            let c3d = new THREE.Object3D()
            let sMass = 0

            let m = this.par.mat0
            if (this.obj.mass != 0) m = this.par.mat1

            let shapeConfig = null;

            if (o.tip == "capsule") {
                shapeConfig = new OIMO.ShapeConfig()
                shapeConfig.geometry = new OIMO.CapsuleGeometry(o.w * this.par.scalePh, o.h * this.par.scalePh)
                this.mesh = new THREE.Mesh(new THREE.CapsuleGeometry(o.w/2,o.h,4,16), m);
               // this.mesh.scale.set(o.w, o.h, o.w);            
                sMass = o.w * o.h * o.w

                
            }


            if (o.tip == "cone") {
                shapeConfig = new OIMO.ShapeConfig()
                shapeConfig.geometry = new OIMO.ConeGeometry(o.w * this.par.scalePh, o.h * this.par.scalePh)
                this.mesh = new THREE.Mesh(this.par.coneGeom, m);
                this.mesh.scale.set(o.w, o.h, o.w);            
                sMass = o.w * o.h * o.w

                
            }




            if (o.tip == "cylinder") {
                shapeConfig = new OIMO.ShapeConfig()
                shapeConfig.geometry = new OIMO.CylinderGeometry(o.w * this.par.scalePh, o.h * this.par.scalePh)
                this.mesh = new THREE.Mesh(this.par.cylinderGeom, m);
                this.mesh.scale.set(o.w, o.h, o.w);            
                sMass = o.w * o.h * o.w
            }


            if (o.tip == "sphere") {
                shapeConfig = new OIMO.ShapeConfig()
                shapeConfig.geometry = new OIMO.SphereGeometry(o.w * this.par.scalePh)
                this.mesh = new THREE.Mesh(this.par.sphereGeometry, m);
                this.mesh.scale.set(o.w, o.w, o.w)            
                sMass = o.w * o.w * o.w
            }

            if (o.tip == "box" || !shapeConfig) {

                shapeConfig = new OIMO.ShapeConfig()
                shapeConfig.geometry = new OIMO.BoxGeometry(new OIMO.Vec3(o.w * this.par.scalePh, o.h * this.par.scalePh, o.d * this.par.scalePh))
                this.mesh = new THREE.Mesh(this.par.baxGeom, m);
                this.mesh.scale.set(o.w, o.h, o.d)
                sMass = o.w * o.h * o.d
                
                if(ii==0 && o.h/o.w>5){//трубы
                    this.boolHHH=true
                }
            }


            this.arrMesh.push(this.mesh)
            let shepe = new OIMO.Shape(shapeConfig)
            this.mesh.boolShepe = true;
            shepe.mesh = this.mesh;
            if (!this._debug) this.mesh.visible = false
            c3d.add(this.mesh)
            if (window.bdLevu != undefined) bdLevu.add(this.mesh)


            shepe.c3d = c3d; //контент 
            shepe.sMass = sMass; //масса тела
            shepe.vectPosition = new THREE.Vector3() //для центра массы
            shepe.hron = undefined //маркер для хронов add/remove
            shepe.uuid = this.par.metod.generateRendom(1)
            shepe.idArr = this.arrShepes.length
            shepe.phBlok = this;
            shepe.oInfo = o
            shepe.distanceForst=0


            this.shapeForstPosition(shepe)
            return shepe
        }
        let _transform, _position, _rotation
        this.shapeForstPosition = function(shepe) {
            if (!shepe) return
            if (!shepe.oInfo) return
            _transform = shepe.getTransform();
            _position = new OIMO.Vec3(0, 0, 0)
            _rotation = new OIMO.Quat(0, 0, 0, 1)

            if (shepe.oInfo.p) {
                _position.x = shepe.oInfo.p.x;
                _position.y = shepe.oInfo.p.y;
                _position.z = shepe.oInfo.p.z;
            }
            shepe.positionStart=_position;

            if (shepe.oInfo.q) {
                 _rotation.x = shepe.oInfo.q.x;
                _rotation.y = shepe.oInfo.q.y;
                _rotation.z = shepe.oInfo.q.z;
                _rotation.w = shepe.oInfo.q.w;
            }
            _transform.setPosition(_position)
            shepe.c3d.position.set(_position.x, _position.y, _position.z);
            _transform.setOrientation(_rotation)
            shepe.c3d.quaternion.set(_rotation.x, _rotation.y, _rotation.z, _rotation.w);
            shepe.setLocalTransform(_transform)
        }

        this.mass=0
        this.arrShepes = []
        this.arrMesh = []
        this.start = function(o) {
            this.obj = o;
            this.mass=1
            if (this.obj.mass == undefined) this.obj.mass = 0
            // this.obj.mass=0    
            if (this.obj.position == undefined) this.obj.position = { x: 0, y: 0, z: 0 }
            this.bodyConfig = new OIMO.RigidBodyConfig()
            this.bodyConfig.type = OIMO.RigidBodyType.DYNAMIC // DYNAMIC, KINEMATIC, STATIC
            if (this.obj.mass == 0) {
                this.mass=0
                this.bodyConfig.type = OIMO.RigidBodyType.STATIC // DYNAMIC, KINEMATIC, STATIC
            }
            this.bodyConfig.position = new OIMO.Vec3(this.obj.position.x, this.obj.position.y, this.obj.position.z);

            this.body = new OIMO.RigidBody(this.bodyConfig)
            this.body.uuid = this.par.metod.generateRendom(1)
            this.body.phBlok = this

            if (this.obj.arrShepes) {
                for (var i = 0; i < this.obj.arrShepes.length; i++) {
                    let shepe = this.getShape(this.obj.arrShepes[i],undefined,i)

                    if (shepe) {
                        this.arrShepes.push(shepe);
                        this.hron.addShapes(shepe);

                        if(i!=0){
                            
                            let d=this.hron.metodPBH.getDistance3d(this.arrShepes[0].positionStart,shepe.positionStart)
                            shepe.distanceForst=d;
                        }
                    }

                }
                if (this.obj.mass) this.hron.center = true
            }
            if (this.obj.joints) {

                for (var i = 0; i < this.obj.joints.array.length; i++) {
                    trace("i~~ii",i,this.obj.joints.array[i])
                    this.getJoint(this.obj.joints.array[i])
                }
                if (this.obj.joints.array.length != 0) {
                    this.hron.metodPBH.inapesAll()
                }
            }
        }


        //////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        this.arrayJoint = []
        this.getJoint = function(o, inBody) {
            let jc = null;

            jc = new OIMO.SphericalJointConfig();
            let postStart = new THREE.Vector3(0, 0, 0)
            if (o && o.position) {
                postStart = new THREE.Vector3(o.position.x, o.position.y, o.position.z)
            }
            jc.rigidBody1 = this.body;
            jc.localAnchor1 = new OIMO.Vec3(postStart.x, postStart.y, postStart.z);
            if (inBody) {
                jc.rigidBody2 = inBody;
            } else {
                jc.rigidBody2 = this.par.phNiz.body;
            }

            let joint = new OIMO.SphericalJoint(jc);
            joint.idArrAll = this.par.mJoint.arrayAll.length
            this.par.mJoint.arrayAll.push(joint)
            let c3d = new THREE.Object3D()
            c3d.position.set(postStart.x, postStart.y, postStart.z);

            if (window.localS && localS.object.dubag) {
                let mesh = new THREE.Mesh(this.par.sphereGeometry, this.par.mat0);
                mesh.scale.set(1, 1, 1)
                c3d.add(mesh);
              
                if (window.bdLevu != undefined) bdLevu.add(c3d)
                self.label = new TLabel(c3d, 1.2, 0, "." + joint.idArrAll);
                self.label.fontSize = 1;
                self.label.object3d.scale.z = 0.1;
                self.label.object3d.rotation.x = Math.PI / 2
            }


            joint.userData = {}
            joint.userData.oInfo = o;
            joint.userData.c3d = c3d;
            joint.userData.jc = jc;
            joint.userData.postStart = postStart
            joint.userData.phBlok = this
            joint.userData.parentPHB = null
            joint.uuid = par.metod.generateRendom(1)

            this.content3d.add(c3d)

            this.hron.addJoint(joint, this.body);
            this.arrayJoint.push(joint);
            return joint;
        }


        var sp;
        this.setPositionJoint = function(joint, x, y, z, _sp) {
            sp = 2;
            if (_sp) sp = _sp
            joint.userData.jc["localAnchor" + sp].x = x
            joint["_localAnchor" + sp + "X"] = x
            joint.userData.jc["localAnchor" + sp].y = y
            joint["_localAnchor" + sp + "Y"] = y
            joint.userData.jc["localAnchor" + sp].z = z
            joint["_localAnchor" + sp + "Z"] = z
            if (sp == 1) {
                if (joint.userData && joint.userData.c3d) {
                    joint.userData.c3d.position.set(x, y, z);
                }
            }
        }


        var impulseNull = new OIMO.Vec3(0, 0, 0)
        var positionInWorldNull = new OIMO.Vec3(0, 0, 0)
        var rotationNull = new OIMO.Quat(0, 0, 0, 1)
        var imp, posIn
        this.stopMove = function() {
            this.body.applyLinearImpulse(impulseNull)
            this.body.setAngularVelocity(impulseNull)
            this.body.setLinearVelocity(impulseNull)
            this.setRotation(rotationNull)
        }

        this.clearStart = function() {
            this.stopMove();
            this.hron.clearStart()
        }


        this.setPosition = function(v, bool) {
            this.body.setPosition(new OIMO.Vec3(v.x, v.y, v.z))
            if (bool == undefined) this.upDate(true)
        }

        this.setRotation = function(v, bool) {
            this.body.setOrientation(new OIMO.Quat(v.x, v.y, v.z, v.w))
            if (bool == undefined) this.upDate(true)
        }

        this.getPosition = function() {
            let p = this.body.getPosition()
            return { x: p.x, y: p.y, z: p.z }
        }
        this.getRotation = function() {
            let p = this.body.getOrientation()
            return { x: p.x, y: p.y, z: p.z, w: p.w }
        }

        var pNull = { x: 0, y: 0, z: 0 }
        var qNull = { x: 0, y: 0, z: 0, w: 1 }
        var positSP, quaternionSP
        this.savePS = function() {
            positSP = this.getPosition()
            quaternionSP = this.getRotation()
            this.setPosition(pNull)
            this.getRotation(qNull)
        }

        this.startPS = function() {
            this.setPosition(positSP)
            this.getRotation(quaternionSP)
        }


        this.funDoUp = undefined
        this.sahDrah = 0
        var origin, rotation
        var p, q, ms
        this.upDate = function(b) {
            if (b == undefined && this.obj.mass == 0) return;
            if (this.body.isSleeping() == true && this.obj.mass !== 0) {
                return
            }
            if (this._active == false) return
            if (this.funDoUp) this.funDoUp()
            this.sahDrah++
            p = this.body.getPosition()
            this.content3d.position.set(p.x, p.y, p.z);
            q = this.body.getOrientation();
            this.content3d.quaternion.set(q.x, q.y, q.z, q.w);

            if (this.upDatePost !== undefined) this.upDatePost(p, q)
        }

        this.upDatePost = undefined

        this.dboolStop = function() {            
            if(this.mass!=0){  
                if(this._boolStop==true){
                    if(this.oldObj==undefined){
                        this.oldObj={}
                        this.oldObj._invMass=this.body._invMass;
                        this.oldObj._mass=this.body._mass;
                        this.oldObj._type=this.body._type;
                    }
                    this.body._invMass=0;
                    this.body._mass=8000000000;
                    this.body._type=1;
                }else{
                    if(this.oldObj!==undefined){
                        this.body._invMass=this.oldObj._invMass
                        this.body._mass=this.oldObj._mass
                        this.body._type=this.oldObj._type
                    }
                } 
            }
        } 
    }


    set boolStop(value) {
        if (this._boolStop !== value) {
            this._boolStop = value
          
            this.dboolStop()
        }
    }
    get boolStop() {
        return this._boolStop;
    }


    set debug(v) {
        if (this._debug != v) {
            this._debug = v;
            
            if (v) {
                this.content3d.add(this.c3dDeb);
            } else {
                this.content3d.remove(this.c3dDeb);
            }
            for (var i = 0; i < this.arrMesh.length; i++) {
                this.arrMesh[i].visible=this._debug
            }
          
            for (var i = 0; i < this.hron.arrShAll.length; i++) {
                if(this.hron.arrShAll[i] &&this.hron.arrShAll[i].phBlok){
                    this.hron.arrShAll[i].phBlok.debug=this._debug
                }             
            }
        }
    }
    get debug() { return this._debug; }


    set active(v) {
        if (this._active != v) {
            this._active = v;

            if (v) {
                this.par.content3d.add(this.content3d);
                this.par.physicsWorld.addRigidBody(this.body);
                //this.content3d.add(this.mesh); 
            } else {
                this.par.content3d.remove(this.content3d);
                this.par.physicsWorld.removeRigidBody(this.body);
                //this.content3d.remove(this.mesh); 
            }
        }
    }
    get active() { return this._active; }
}



class oimo_dynamicsWWWW {
    constructor(joint) {
        this.joint = joint;
        this.xX = 0;
        this.xY = 0;
        this.xZ = 0;
        this.yX = 0;
        this.yY = 0;
        this.yZ = 0;
        this.zX = 0;
        this.zY = 0;
        this.zZ = 0;
    }
}
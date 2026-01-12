

//import * as THREE from 'three';


export class JDLoader {
    constructor() {         
        this.type="JDLoader";


	    
	      
	    this.load= function (url, onLoad, onProgress, onError) {
			var scope = this;


			var texturePath = ''//this.texturePath && (typeof this.texturePath === 'string') ? this.texturePath : THREE.Loader.prototype.extractUrlBase(url);
			texturePath=''
			this.crossOrigin='*';
			var loader = new THREE.FileLoader(this.manager);
			loader.load(url, function (text) {
				scope.loadText(text, onLoad, texturePath);
			}, onProgress, onError);
		}


		this.loadText=  function (text, onLoad, texturePath) {
			var json = JSON.parse(text);
			if (json) {
				var object = this.parse(json, texturePath);
				onLoad(object);
			}
		}
		this.setTexturePath=  function (value) {
			this.texturePath = value;
		}
		this.parse=  function (json, texturePath) {
			var i = 0;
			var scope = this;
			var materials = [];
			var nodes = [];
			var geometries = [];
			parseMaterials();
			parseHierachy();
			parseModel();
			parseKeyFrameAnimations();
			for (i = 0; i < geometries.length; ++i) {
				
				if(geometries[i].computeFaceNormals)geometries[i].computeFaceNormals();
				geometries[i].computeBoundingSphere();
			}
			var sphere = getBoundingSphere();

			var object3D = parseJV();
			object3D.jsonSource = json;

			return {
				geometries: geometries,
				materials: materials,
				boundingSphere: sphere,
				object3D: object3D
			};

			function parseJV () {
				var arrObj3d = [];
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].arrGeom == undefined) {
						arrObj3d[i] = new THREE.Object3D();
						arrObj3d[i].name = nodes[i].name;
					} else {
						var mat = materials[nodes[i].arrMat[0][0].materialIndex];
						mat.skinning = false;
						mat.side = THREE.DoubleSide;
						if (mat.opacity < 1) mat.transparent = true;
						if (mat.map) mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
						if (mat.normalMap) mat.normalMap.wrapS = mat.normalMap.wrapT = THREE.RepeatWrapping;
						if (mat.alphaMap) mat.alphaMap.wrapS = mat.alphaMap.wrapT = THREE.RepeatWrapping;
						var geom = geometries[nodes[i].arrGeom[0]];
						/// проверка пормалей
						if (geom.attributes) {
							if (geom.attributes.normal == undefined) { // генерим
								geom.computeVertexNormals();
							}
						}

						arrObj3d[i] = new THREE.Mesh(geom, mat);
						arrObj3d[i].name = nodes[i].name;
					}
					//arrObj3d[i].applyMatrix4(getNodeTransformJV(i));
				}

				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].parent === -1) continue;
					arrObj3d[nodes[i].parent].add(arrObj3d[i]);
				}
				return arrObj3d[0];
			}

			function getBoundingSphere () {
				var boundingSphere = new THREE.Sphere();
				var i, j, geometry;
				var d = 0;


				var sumRidius = 0;


				var radius = 0;
				var certerArray = [];


				var radiusArray = [];


				var weights = [];
				var center = new THREE.Vector3(0, 0, 0);
				var vTemp = new THREE.Vector3(0, 0, 0);
				if (geometries && geometries.length) {
					for (i = 0; i < geometries.length; ++i) {
						if (!geometries[i].boundingSphere) {
							geometries[i].computeBoundingSphere();
						}
						sumRidius += geometries[i].boundingSphere.radius;
					}
					if (sumRidius > 0) {
						for (i = 0; i < geometries.length; ++i) {
							geometry = geometries[i];
							radiusArray.push(geometry.boundingSphere.radius);
							certerArray.push(geometry.boundingSphere.center);
							vTemp.copy(geometry.boundingSphere.center);
							vTemp.multiplyScalar(geometry.boundingSphere.radius / sumRidius);
							center.add(vTemp);
						}
						for (i = 0; i < geometries.length; ++i) {
							var len = center.distanceTo(certerArray[i]);
							if (len >= d) {
								d = len;
								radius = d + radiusArray[i];
							}
						}
						boundingSphere.center = center;
						boundingSphere.radius = radius;
					}
				}
				return boundingSphere;
			}

			function getBones (mesh) {
				if (mesh && mesh.skin && mesh.skin.skinBones.length && mesh.skin.skinWeights.length) {
					return nodes;
				} else {
					var newNodes = [];
					newNodes.push(nodes[0]);
					var node = nodes[mesh.node];
					var newNode = {};
					newNode.name = node.name;
					newNode.parent = 0;
					newNode.pos = [node.pos[0], node.pos[1], node.pos[2]];
					newNode.scl = [node.scl[0], node.scl[1], node.scl[2]];
					newNode.rotq = [node.rotq[0], node.rotq[1], node.rotq[2], node.rotq[3]];
					newNodes.push(newNode);
					return newNodes;
				}
			}

			function parseMaterials () {
				materials = [];
				
				if (json.materials === undefined || json.materials.length === 0) {
					return;
				}
				var textureLoader = new THREE.TextureLoader();
				textureLoader.setCrossOrigin(scope.crossOrigin);

				var textureNormalLoader = new THREE.TextureLoader();
				textureNormalLoader.setCrossOrigin(scope.crossOrigin);

				var textureAlphaLoader = new THREE.TextureLoader();
				textureAlphaLoader.setCrossOrigin(scope.crossOrigin);

				var texture;
				var textureNormal;
				var textureAlpha;
				var texturedMaterial;
				var diffuse, specular, glossiness;
				var isThisVideoInsteadTexture = false;

				var i = 0;


				var j = 0;
				for (i = 0; i < json.materials.length; ++i) {
					var m = json.materials[i];
					
					diffuse = new THREE.Color(16777215);
					specular = new THREE.Color(1644825);
					if (m.diffuse) {
						diffuse.fromArray(m.diffuse);
					}
					if (m.specular) {
						specular.fromArray(m.specular);
					}
					glossiness = m.glossiness !== undefined ? m.glossiness : 40;
					texture = undefined;
					textureNormal = undefined;
					textureAlpha = undefined;

					if (m.maps) {
						
						for (var iMap = 0; iMap < m.maps.length; ++iMap) {
							if (m.maps[iMap].type == 'diffuse' && m.maps[iMap].file != '') {

								var bLoadData = false;
							
								if (m.maps[iMap].data !== undefined) {
									var fileType = m.maps[iMap].file.substring(m.maps[iMap].file.lastIndexOf('.') + 1);
									fileType = fileType.toLowerCase();
									fileType = fileType == 'jpg' ? 'jpeg' : fileType;

									if (fileType == 'bmp' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
										var strData = '';
										var binData = m.maps[iMap].data;
										var n = binData.length;
										for (j = 0; j < n; ++j) {
											strData += String.fromCharCode(binData[j]);
										}
										var encdData = window.btoa(strData);
										var encdData = 'data:image/' + fileType + ';base64,' + encdData;
										texture = new THREE.Texture();
										var image = new Image();
										texture.image = image;
										

										image.src = encdData;
										image.onload = (function (tex) {
											return function () {
												tex.needsUpdate = true;
											};
										}(texture));
										bLoadData = true;
									}
								} else {
									var fileType = m.maps[iMap].file.substring(m.maps[iMap].file.lastIndexOf('.') + 1);
									
									if (fileType == 'mp4') {
										isThisVideoInsteadTexture = true;

										texture = m.maps[iMap].file;

										bLoadData = true;
									}
								}
								if (!bLoadData && !isThisVideoInsteadTexture) {
									
							
									texture = textureLoader.load(texturePath + m.maps[iMap].file);
								}
								// break // commented by serj
							}
							if (m.maps[iMap].type == 'bump' && m.maps[iMap].file != '') {
								var bLoadData2 = false;

								if (m.maps[iMap].data !== undefined) {
									var fileType = m.maps[iMap].file.substring(m.maps[iMap].file.lastIndexOf('.') + 1);
									fileType = fileType.toLowerCase();
									fileType = fileType == 'jpg' ? 'jpeg' : fileType;
									if (fileType == 'bmp' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
										var strData = '';
										var binData = m.maps[iMap].data;
										var n = binData.length;
										for (j = 0; j < n; ++j) {
											strData += String.fromCharCode(binData[j]);
										}
										var encdData = window.btoa(strData);
										var encdData = 'data:image/' + fileType + ';base64,' + encdData;
										textureNormal = new THREE.Texture();
										var image = new Image();
										textureNormal.image = image;
										image.src = encdData;
										
										image.onload = (function (tex2) {
											return function () {
												tex2.needsUpdate = true;
											};
										}(textureNormal));
										bLoadData2 = true;
									}
								}
								if (!bLoadData2) {
									
									textureNormal = textureNormalLoader.load(texturePath + m.maps[iMap].file);
								}
								// break         // commented by serj
							}

							if (m.maps[iMap].type == 'opacity' && m.maps[iMap].file != '') {
								var bLoadData3 = false;

								if (m.maps[iMap].data !== undefined) {
									var fileType = m.maps[iMap].file.substring(m.maps[iMap].file.lastIndexOf('.') + 1);
									fileType = fileType.toLowerCase();
									fileType = fileType == 'jpg' ? 'jpeg' : fileType;
									if (fileType == 'bmp' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
										var strData = '';
										var binData = m.maps[iMap].data;
										var n = binData.length;
										for (j = 0; j < n; ++j) {
											strData += String.fromCharCode(binData[j]);
										}
										var encdData = window.btoa(strData);
										var encdData = 'data:image/' + fileType + ';base64,' + encdData;
										textureAlpha = new THREE.Texture();
										var image = new Image();
										textureAlpha.image = image;
										image.src = encdData;
									
										image.onload = (function (tex2) {
											return function () {
												tex2.needsUpdate = true;
											};
										}(textureAlpha));
										bLoadData3 = true;
									}
								}
								if (!bLoadData3) {
									textureAlpha = textureAlphaLoader.load(texturePath + m.maps[iMap].file);
								}
								// break         // commented by serj
							}

						}
					}

					if (isThisVideoInsteadTexture) {

						var videoTexture = new THREE.VideoTexture(texture);
						// T_SHADER.videoTextures.push(function(){
						//     videoTexture.update()
						// })
				
						var vMat = new THREE.MeshBasicMaterial({
							map: videoTexture.texture
						});
						materials.push(vMat);

						// var movieMaterial = new ChromaKeyMaterial(texture, diffuse);

						// materials.push(movieMaterial);


						isThisVideoInsteadTexture = false;
					} else {

						// added viktor если нет карты нормалей и карты прозрачности создаем базик материал
						//
						var typeMaterial;
						var param;

						if (scope.boolPhong == true) {
					
							typeMaterial = THREE.MeshPhongMaterial;
							//typeMaterial = THREE.MeshBasicMaterial
							param = {
								color: texture ? 0xFFFFFF : diffuse.getHex(),
								// color: null,
								specular: specular.getHex(),
								shininess: glossiness,
								flatShading: THREE.SmoothShading,
								skinning: true
							};
						} else {
						
							//typeMaterial = THREE.MeshBasicMaterial;
							typeMaterial = THREE.MeshPhysicalMaterial;

							param = {
								color: texture ? 0xFFFFFF : diffuse.getHex()
								// color: null,
							};
						}

						if (typeMaterial==undefined)
						if (!textureNormal && !textureAlpha) {
						
							typeMaterial = THREE.MeshBasicMaterial;
						}


						texturedMaterial = new typeMaterial(param);


						if (texture) {
							texturedMaterial.map = texture;
						}
						if (textureNormal) {
							texturedMaterial.normalMap = textureNormal;
						}
						if (textureAlpha) {
							texturedMaterial.alphaMap = textureAlpha;
							// texturedMaterial.depthWrite = false;
							// texturedMaterial.depthTest = false;
							// texturedMaterial.alphaTest = 0.6;
						}
						if (m.opacity !== undefined) {
							texturedMaterial.opacity = m.opacity;
							if (m.opacity < 1) {
								texturedMaterial.transparent = true;
							}
						}

						// ?? texturedMaterial.transparent = true;
						if (m.name)texturedMaterial.name = m.name;
						materials.push(texturedMaterial);
					}
				}
			}

			function parseHierachy () {
				nodes = (json.hierarchy !== undefined ? json.hierarchy.nodes : json.nodes);
				if (Array.isArray(nodes) && nodes.length > 0) {
					for (var i = 0; i < nodes.length; ++i) {
						if (nodes[i].rot !== undefined) {
							nodes[i].rotq = nodes[i].rot;
							nodes[i].rot = undefined;
						}
					}
				} else {
					nodes = [];
				}
			}

			function getWorldTransform (iNode) {
				var tm = new THREE.Matrix4();
				if (!nodes || iNode < 0 || !nodes[iNode]) {
					return tm;
				}
				for (var i = iNode; i >= 0; i = nodes[i].parent) {
					var node = nodes[i];
					var pos = new THREE.Vector3(node.pos[0], node.pos[1], node.pos[2]);
					var scl = new THREE.Vector3(node.scl[0], node.scl[1], node.scl[2]);
					var rot = new THREE.Quaternion(node.rotq[0], node.rotq[1], node.rotq[2], node.rotq[3]);
					var tmNode = new THREE.Matrix4().compose(pos, rot, scl);
					tm.premultiply(tmNode);
				}
				return tm;
			}

			function getNodeTransform (iNode) {
				var tm = new THREE.Matrix4();
				if (!nodes || iNode < 0 || !nodes[iNode]) {
					return tm;
				}
				var node = nodes[iNode];
				var pos = new THREE.Vector3(node.pos[0], node.pos[1], node.pos[2]);
				var scl = new THREE.Vector3(node.scl[0], node.scl[1], node.scl[2]);
				var rot = new THREE.Quaternion(node.rotq[0], node.rotq[1], node.rotq[2], node.rotq[3]);
				return {
					pos: pos,
					rot: rot,
					scl: scl
				};
			}

			function getNodeTransformJV (iNode) {
				var tm = new THREE.Matrix4();
				if (!nodes || iNode < 0 || !nodes[iNode]) {
					return tm;
				}
				var node = nodes[iNode];
				var pos = new THREE.Vector3(node.pos[0], node.pos[1], node.pos[2]);
				var scl = new THREE.Vector3(node.scl[0], node.scl[1], node.scl[2]);
				var rot = new THREE.Quaternion(node.rotq[0], node.rotq[1], node.rotq[2], node.rotq[3]);
				tm.compose(pos, rot, scl);
				return tm;
			}

			function getFirstUVIndex (groups) {
				var i = -1;
				if (!groups || !json.materials) {
					return 0;
				}
				for (var iGroup = 0; iGroup < groups.length; ++iGroup) {
					var mat = json.materials[groups[iGroup].materialIndex];
					if (mat && mat.maps) {
						for (var iMap = 0; iMap < mat.maps.length; ++iMap) {
							if (mat.maps[iMap].type == 'diffuse') {
								if (i < 0) {
									i = mat.maps[iMap].uvsIndex;
								} else {
									if (i != mat.maps[iMap].uvsIndex) {
										return i;
									}
								}
							}
						}
					}
				}
				return (i < 0 ? 0 : i);
			}

			function parseModel () {
				var model = json.model;
				if (!model || !model.meshes) {
					return;
				}
				var i, j, d, n, geometry, mesh, nVerts, verts, iVert, vertElementObj, nodeIndex, nLength, vertex, face, normal, uvLayer, uv, u, v, nUvLayers, faceObj, vertIndices, normals, colors, uvs, skin, nodeIndex, meshNode, vertElementIndices, groups, tmNode, a, b, c, nFaces, iFace, iSkin;
				for (var iMesh = 0; iMesh < model.meshes.length; ++iMesh) {
					nUvLayers = 0;
					geometry = new THREE.BufferGeometry();
					mesh = model.meshes[iMesh];
					if (mesh == undefined) {
						return;
					}
					if (mesh.name) {
						geometry.name = mesh.name;
					}
					verts = mesh.verts;
					if (verts == undefined) {
						return;
					}
					vertElementObj = mesh.vertElement;
					if (vertElementObj == undefined) {
						return;
					}
					faceObj = mesh.face;
					vertIndices = vertElementObj.vertIndices;
					normals = vertElementObj.normals;
					colors = vertElementObj.colors;
					uvs = vertElementObj.uvs;
					skin = mesh.skin;
					nodeIndex = mesh.node;
					if (nodeIndex == undefined || !(nodeIndex >= 0 && nodeIndex < nodes.length)) {
						return;
					}
					meshNode = nodes[nodeIndex];
					if (!meshNode || !meshNode.pos || !meshNode.rotq || !meshNode.scl) {
						return;
					}
					if (faceObj == undefined) {
						return;
					}
					vertElementIndices = faceObj.vertElementIndices;
					groups = faceObj.groups;
					if (!vertElementIndices || !groups) {
						return;
					}

					// added by JV
					if (nodes[mesh.node].arrGeom === undefined) {
						nodes[mesh.node].arrGeom = [];
						nodes[mesh.node].arrMat = [];
					}

					nodes[mesh.node].arrGeom.push(geometries.length);
					nodes[mesh.node].arrMat.push(groups);
					// -----.setAttribute()


					// tmNode = getWorldTransform(nodeIndex);// comented by JV
					nVerts = vertIndices.length;
					var positions = new Float32Array(nVerts * 3);
					for (iVert = 0; iVert < nVerts; ++iVert) {
						i = vertIndices[iVert] * 3;
						j = iVert * 3;
						vertex = new THREE.Vector3(verts[i], verts[i + 1], verts[i + 2]);
						// vertex.applyMatrix4(tmNode);// comented by JV
						positions[j] = vertex.x;
						positions[j + 1] = vertex.y;
						positions[j + 2] = vertex.z;
					}
					geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
					if (uvs !== undefined && uvs.length > 0) {
						i = getFirstUVIndex(groups);
						i = (i < uvs.length ? i : 0);
						var uv = new Float32Array(uvs[i]);
						geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
						if (uvs.length > 1) {
							i = (i == 0 ? 1 : 0);
							uv = new Float32Array(uvs[i]);
							geometry.setAttribute('uv2', new THREE.BufferAttribute(uv, 2));
						}
					}
					if (normals !== undefined && normals.length > 0) {
						geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
					}
					var indices = new Uint32Array(vertElementIndices);
					geometry.setIndex(new THREE.BufferAttribute(indices, 1));
					geometry.groups = groups;
					n = verts.length / 3;
					if (!skin && meshNode.parent >= 0) {
						skin = mesh.skin = {};
						skin.skinBones = [], skin.skinWeights = [];
						for (iVert = 0; iVert < n; ++iVert) {
							skin.skinBones.push([nodeIndex]);
							skin.skinWeights.push([1]);
						}
					}
					var skinIndices = [];


					var skinWeights = [];
					iSkin = 0;
					var vBoneIndices, vWeights;
					if (skin && skin.skinBones && skin.skinWeights && skin.skinBones.length == skin.skinWeights.length) {
						for (iVert = 0; iVert < n; ++iVert) {
							vBoneIndices = new THREE.Vector4(0, 0, 0, 0);
							vWeights = new THREE.Vector4(0, 0, 0, 0);
							var iLink = 0;
							for (d = 0; d < 4; ++d) {
								if (d < skin.skinBones[iVert].length) {
									vBoneIndices.setComponent(d, skin.skinBones[iVert][d]);
									vWeights.setComponent(d, skin.skinWeights[iVert][d]);
									++iLink;
								} else {
									vBoneIndices.setComponent(d, 0);
									vWeights.setComponent(d, 0);
								}
							}
							while (iLink < skin.skinWeights[iVert].length) {
								vWeights.addScalar(skin.skinWeights[iVert][iLink] * 0.25);
								++iLink;
							}
							skinIndices.push(vBoneIndices);
							skinWeights.push(vWeights);
						}
					}
					if (skinIndices.length > 0 && skinWeights.length > 0) {
						geometry.setAttribute('skinIndex', new THREE.Float32BufferAttribute(new Float32Array(nVerts * 4), 4));
						geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Float32Array(nVerts * 4), 4));
						for (iVert = 0; iVert < nVerts; ++iVert) {
							i = vertIndices[iVert];
							vBoneIndices = skinIndices[i];
							vWeights = skinWeights[i];
							geometry.attributes.skinIndex.setXYZW(iVert, vBoneIndices.x, vBoneIndices.y, vBoneIndices.z, vBoneIndices.w);
							geometry.attributes.skinWeight.setXYZW(iVert, vWeights.x, vWeights.y, vWeights.z, vWeights.w);
						}
					}
					var bones = getBones(mesh);
					if (bones && bones.length > 0) {
						geometry.bones = bones;
					}
					geometries.push(geometry);
				}
			}

			function parseModel_toGeometry () {
				var model = json.model;
				if (!model || !model.meshes) {
					return;
				}
				var i, j, d, geometry, mesh, verts, iVert, vertElementObj, nodeIndex, nLength, materialIndex, vertex, face, normal, uvLayer, uv, u, v, nUvLayers, faceObj, vertIndices, normals, colors, uvs, skin, nodeIndex, meshNode, vertElementIndices, tmNode, a, b, c, nFaces, iFace, iSkin;
				for (var iMesh = 0; iMesh < model.meshes.length; ++iMesh) {
					nUvLayers = 0;
					geometry = new THREE.Geometry();
					mesh = model.meshes[iMesh];
					if (mesh == undefined) {
						return;
					}
					if (mesh.name) {
						geometry.name = mesh.name;
					}
					verts = mesh.verts;
					if (verts == undefined) {
						return;
					}
					vertElementObj = mesh.vertElement;
					if (vertElementObj == undefined) {
						return;
					}
					faceObj = mesh.face;
					vertIndices = vertElementObj.vertIndices;
					normals = vertElementObj.normals;
					colors = vertElementObj.colors;
					uvs = vertElementObj.uvs;
					skin = mesh.skin;
					nodeIndex = mesh.node;
					if (nodeIndex == undefined || !(nodeIndex >= 0 && nodeIndex < nodes.length)) {
						return;
					}
					meshNode = nodes[nodeIndex];
					if (!meshNode || !meshNode.pos || !meshNode.rotq || !meshNode.scl) {
						return;
					}
					if (faceObj == undefined) {
						return;
					}
					vertElementIndices = faceObj.vertElementIndices;
					if (!vertElementIndices) {
						return;
					}
					if (faceObj.materialIndex === undefined && faceObj.materialIndices === undefined) {
						return;
					}
					// tmNode = getWorldTransform(nodeIndex);// comented by JV
					for (i = 0; i + 2 < verts.length; i += 3) {
						vertex = new THREE.Vector3(verts[i], verts[i + 1], verts[i + 2]);
						// vertex.applyMatrix4(tmNode);// comented by JV
						geometry.vertices.push(vertex);
					}
					if (uvs !== undefined) {
						for (i = 0; i < uvs.length; i++) {
							if (uvs[i].length) {
								nUvLayers++;
							}
						}
						for (i = 0; i < nUvLayers; i++) {
							geometry.faceVertexUvs[i] = [];
						}
					}
					a = 0, b = 0, c = 0;
					nFaces = vertElementIndices.length / 3;
					for (iFace = 0; iFace < nFaces; ++iFace) {
						face = new THREE.Face3();
						a = vertElementIndices[iFace * 3];
						b = vertElementIndices[iFace * 3 + 1];
						c = vertElementIndices[iFace * 3 + 2];
						face.a = vertIndices[a];
						face.b = vertIndices[b];
						face.c = vertIndices[c];
						materialIndex = 0;
						if (faceObj.materialIndices !== undefined) {
							materialIndex = iFace < faceObj.materialIndices.length ? faceObj.materialIndices[iFace] : faceObj.materialIndices[0];
						} else {
							if (faceObj.materialIndex !== undefined) {
								materialIndex = faceObj.materialIndex;
							}
						}
						face.materialIndex = (materialIndex < 0 ? 0 : materialIndex);
						if (uvs !== undefined) {
							for (i = 0; i < nUvLayers; i++) {
								uvLayer = uvs[i];
								geometry.faceVertexUvs[i][iFace] = [];
								for (j = 0; j < 3; ++j) {
									iVert = vertElementIndices[iFace * 3 + j];
									u = uvLayer[iVert * 2];
									v = uvLayer[iVert * 2 + 1];
									uv = new THREE.Vector2(u, v);
									geometry.faceVertexUvs[i][iFace].push(uv);
								}
							}
						}
						if (normals !== undefined) {
							normal = new THREE.Vector3(normals[a * 3], normals[a * 3 + 1], normals[a * 3 + 2]);
							face.vertexNormals.push(normal);
							normal = new THREE.Vector3(normals[b * 3], normals[b * 3 + 1], normals[b * 3 + 2]);
							face.vertexNormals.push(normal);
							normal = new THREE.Vector3(normals[c * 3], normals[c * 3 + 1], normals[c * 3 + 2]);
							face.vertexNormals.push(normal);
						}
						geometry.faces.push(face);
					}
					if (!skin && meshNode.parent > 0) {
						skin = mesh.skin = {};
						skin.skinBones = [], skin.skinWeights = [];
						for (iVert = 0; iVert < geometry.vertices.length; ++iVert) {
							skin.skinBones.push([nodeIndex]);
							skin.skinWeights.push([1]);
						}
					}
					iSkin = 0;
					if (skin && skin.skinBones && skin.skinWeights && skin.skinBones.length == skin.skinWeights.length) {
						for (iVert = 0; iVert < geometry.vertices.length; ++iVert) {
							var vBoneIndices = new THREE.Vector4(0, 0, 0, 0);
							var vWeights = new THREE.Vector4(0, 0, 0, 0);
							if (skin.skinVerts) {
								for (d = 0; d < 4; ++d) {
									if (iSkin < skin.skinVerts.length && skin.skinVerts[iSkin] == iVert) {
										vBoneIndices.setComponent(d, skin.skinBones[iSkin]);
										vWeights.setComponent(d, skin.skinWeights[iSkin]);
										++iSkin;
									} else {
										vBoneIndices.setComponent(d, 0);
										vWeights.setComponent(d, 0);
									}
								}
								while (iSkin < skin.skinVerts.length && skin.skinVerts[iSkin] == iVert) {
									vWeights.addScalar(skin.skinWeights[iSkin] * 0.25);
									++iSkin;
								}
							} else {
								var iLink = 0;
								for (d = 0; d < 4; ++d) {
									if (d < skin.skinBones[iVert].length) {
										vBoneIndices.setComponent(d, skin.skinBones[iVert][d]);
										vWeights.setComponent(d, skin.skinWeights[iVert][d]);
										++iLink;
									} else {
										vBoneIndices.setComponent(d, 0);
										vWeights.setComponent(d, 0);
									}
								}
								while (iLink < skin.skinWeights[iVert].length) {
									vWeights.addScalar(skin.skinWeights[iVert][iLink] * 0.25);
									++iLink;
								}
							}
							geometry.skinIndices.push(vBoneIndices);
							geometry.skinWeights.push(vWeights);
						}
					}
					var bones = getBones(mesh);
					if (bones && bones.length > 0) {
						geometry.bones = bones;
					}
				
					var geo = new THREE.BufferGeometry();
					geo.fromGeometry(geometry);
					geo.bones = geometry.bones;
					geometries.push(geo);
				}
			}

			function parseKeyFrameAnimations () {
				var anim = json.animation;
				if (!anim || !anim.keyframeAnimations || anim.keyframeAnimations.length == 0) {
					return;
				}
				var keyFrameAnimations = anim.keyframeAnimations.concat();
				var animClips = [];
				var i, c, iAnim, iTrack, trackName;
				for (i = 0; i < keyFrameAnimations.length; i++) {
					c = parseKeyFrameAnimation(keyFrameAnimations[i]);
					if (c) {
						animClips.push(c);
					}
				}
				if (animClips.length > 0) {
					for (i = 0; i < geometries.length; ++i) {
						var hasSkin = false;
						

						if(geometries[i] && geometries[i].type){
							if(geometries[i].type=="Geometry"){
								hasSkin = (geometries[i].skinIndices && geometries[i].skinIndices.length > 0 && geometries[i].skinWeights && geometries[i].skinWeights.length > 0);
						
							}
							if(geometries[i].type=="BufferGeometry"){
								hasSkin = (geometries[i].attributes.skinIndex && geometries[i].attributes.skinIndex.count > 0 && geometries[i].attributes.skinWeight && geometries[i].attributes.skinWeight.count > 0);
						
							}
						}
						


						if (hasSkin) {
							geometries[i].animations = animClips;
						} else {
							geometries[i].animations = [];
							for (iAnim = 0; iAnim < animClips.length; ++iAnim) {
								var tracks = [];
								for (iTrack = animClips[iAnim].tracks.length - 1; iTrack >= 0; --iTrack) {
									trackName = animClips[iAnim].tracks[iTrack].name;
									if (trackName == '.bones[' + geometries[i].name + '].position' || trackName == '.bones[' + geometries[i].name + '].quaternion' || trackName == '.bones[' + geometries[i].name + '].scale') {
										tracks.push(animClips[iAnim].tracks[iTrack]);
									}
								}
								if (tracks.length > 0) {
									geometries[i].animations.push(new THREE.AnimationClip(animClips[iAnim].name, animClips[iAnim].duration, tracks));
								}
							}
						}
					}
				}
			}

			function parseKeyFrameAnimation (animation) {
				if (!animation) {
				
					return null;
				}
				var fps = animation.fps || 30;
				var useSeconds = true;
				var duration = animation.length || -1;
				if (animation.timeline == 'frames') {
					useSeconds = false;
					duration = duration / fps;
				}
				var addTrack = function (trackType, trackName, obj, destTracks) {
					if (obj && Array.isArray(obj.times) && Array.isArray(obj.values)) {
						var times = [];
						var values = [];
						times = times.concat(obj.times);
						values = values.concat(obj.values);
						if (!useSeconds) {
							for (var i = 0; i < times.length; ++i) {
								times[i] /= fps;
							}
						}
						if (times && times.length != 0 && values && values.length != 0) {
							destTracks.push(new trackType(trackName, times, values));
						}
					}
				};
				var tracks = [];
				var clipName = animation.name || 'default';
				var animNodes = animation.animNodes || [];
				for (var iNode = 0; iNode < animNodes.length; iNode++) {
					var animNode = animNodes[iNode];
					if (!animNode) {
						continue;
					}
					var nodeName = '';
					if (animNode.nodeName !== undefined) {
						nodeName = animNode.nodeName;
					} else {
						if (animNode.nodeIndex !== undefined) {
							nodeName = nodes[animNode.nodeIndex].name;
						}
					}
					var boneName = '.bones[' + nodeName + ']';
					addTrack(THREE.VectorKeyframeTrack, boneName + '.position', animNode.pos, tracks);
					addTrack(THREE.VectorKeyframeTrack, boneName + '.scale', animNode.scl, tracks);
					addTrack(THREE.QuaternionKeyframeTrack, boneName + '.quaternion', animNode.rot, tracks);
				}
				if (tracks.length === 0) {
					return null;
				}
				var clip = new THREE.AnimationClip(clipName, duration, tracks);
				return clip;
			}
		}


    } 
}

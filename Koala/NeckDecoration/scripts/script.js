
const Scene = require('Scene');
const Patches = require('Patches');
const Reactive = require('Reactive');
const FaceTracking = require('FaceTracking');
const face0 = FaceTracking.face(0);
  
Promise.all([
      Scene.root.findFirst('bustA'),
      Scene.root.findFirst('bustB'),
      Scene.root.findFirst('bustC'),
]).then(onReady);
  
function onReady(assets) {

      const bustA = assets[0];
      const bustB = assets[1];
      const bustC = assets[2];
  
      const bustAtra = bustA.transform.toSignal();
      const bustBtra = bustB.transform.toSignal();
      const bustCtra = bustC.transform.toSignal();
  
      const faceTra = face0.cameraTransform.applyTo(bustAtra).applyTo(bustBtra).applyTo(bustCtra);
  
      const FaceOffset = Reactive.point(0,0,0.535);

      const neckPos = faceTra.position.add(FaceOffset).expSmooth(70);
  
      Patches.inputs.setVector('neck', neckPos);
}
/**
 * @fileoverview
 * The monolithic Angular app which manages all grid chrome, views,
 * and server interactions.
 */
// TODO: Use @export for scope variables rather than string property access.
goog.provide('windmill.module');

goog.require('windmill.Grid');
// goog.require('windmill.GridRenderer');
goog.require('windmill.GridUi');
goog.require('windmill.GridUiHook');
// goog.require('goog.array');
// goog.require('goog.asserts');
// goog.require('goog.dom.classlist');
// goog.require('goog.object');
goog.require('windmill.Sound');



// angular.element(document).ready(function() {
// document.addEventListener( "DOMContentLoaded", function() {
window.addEventListener( "load", function() {
  var index = 0;
  var PUZZLES = [

    {n:'start', theme:'orange', c:'CAcSAggDEgIoAxICCAESAggBEgIIBBICCAESABICCAESABICCAESAigDEgIIARIAEgIIARICCAESAggBEgASAggBEgASAggBEgASAggBEgIoAxICCAESABICCAESABICCAESAggD_0'},
    // {n:'start', theme:'orange', c:'CAMSAggEEgIoAhICCAESAigDEgIIARIAEgIIARICKAISAggBEgIIARICCAM=_0'},

    {n:'maze-simple', theme:'orange', c:'CAkSAigDEgIIARIAEgIIARICKAISAggEEgIIARICKAcSAggBEgIoBRICCAESAigFEgIIARICKAMSAggBEgIoAxICCAESAigLEgIIARIAEgIIARIAEgIIARICKAsSAggBEgIoBRICCAESAggDEgIoBBICCAESAigD_0'}, // 4x4
    {n:'maze-medium', theme:'orange', c:'CA0SAigEEgIIBBICCAESAigDEgIIARICKAUSAggBEgIoCxICCAESABICCAESAigDEgIIARICKAMSAggBEgIoBRICCAESABICCAESABICCAESABICCAESAigDEgIIARICKAMSAggBEgIoDRICCAESAigDEgIIARICKAMSAggBEgASAggBEgIoBRICCAESABICCAESABICCAESAigFEgIIARIAEgIIARICKAcSAggBEgIoBBICCAMSAigCEgIIARIAEgIIARICKAMSAggBEgIoBxICCAESABICCAESABICCAESABICCAESAigJEgIIARICKAMSAggBEgASAggBEgASAggBEgIoDw==_0'}, // 6x6
    {n:'maze-2starts', theme:'orange', c:'CA0SABICCAUSAigDEgIIBRICCAQSAggFEgIoDRICCAUSABICCAUSAigDEgIIBRICKAUSAggFEgIoCRICCAUSABICCAUSAigFEgIIBRIAEgIIBRICKAMSAggFEgIoAxICCAUSAigFEgIIBRICKAUSAggFEgASAggFEgIoBRICCAUSAigDEgIIBRICKAkSAggFEgASAggFEgIoBRICCAUSAigHEgIIBRIAEgIIBRICKAUSAggFEgIoBRICCAUSABICCAUSAigFEgIIBRICKAUSAggFEgIoEBICCAMSAigEEgIIBRICKAMSAggFEgIoAhICCAM=_0'},
    {n:'maze-large', theme:'orange', c:'CBUSAigLEgIIARICKAUSAggBEgIoAhICCAQSAggBEgIoAxICCAESABICCAESAigDEgIIARICKAMSAggBEgASAggBEgIoBRICCAESABICCAESAigDEgIIARIAEgIIARICKAkSAggBEgIoBxICCAESAigFEgIIARIAEgIIARIAEgIIARICKAMSAggBEgIoAxICCAESABICCAESAigDEgIIARIAEgIIARICKAMSAggBEgIoAxICCAESAggBEgIoAhICCAESAigDEgIIARIAEgIIARICKAUSAggBEgIoAxICCAESAigFEgIIARICKAcSAggBEgIoAxICCAESAigEEgIIARICKAQSAggBEgASAggBEgASAggBEgASAggBEgASAggBEgIoAxICCAESAigDEgIIARIAEgIIARIAEgIIARICKAcSAggBEgIoAxICCAESAigDEgIIARIAEgIIARICKAUSAggBEgASAggBEgIoCRICCAESAigFEgIIARIAEgIIARICKAMSAggBEgIoBRICCAESABICCAESAigJEgIIARICKAUSAggBEgASAggBEgIoCRICCAESAigFEgIIARICKAcSAggBEgASAggBEgIoAxICCAESABICCAESAigHEgIIARIAEgIIARIAEgIIARICKAMSAggBEgASAggBEgIoAxICCAESABICCAESABICCAESAigFEgIIARICKA8SAggBEgASAggBEgIoCRICCAESABICCAESAigDEgIIARIAEgIIARIAEgIIARICKAUSAggBEgIoBxICCAESABICCAESAigHEgIIARICKAMSAggBEgASAggBEgIoAxICCAESAigDEgIIARIAEgIIARICKAUSAggBEgIIARICKAISAggBEgIoAxICCAESABICCAESAigFEgIIARIAEgIIARICKAgSAggDEgIoBhICCAESAigHEgIIARICKAU=_0'}, // 10x10



    // bw teaching section
    {n:'bw1', theme:'blue', c:'CAMSAigEEgQIBxABEgASAggDEgASAggEEgASBAgHEAISAigE_0'}, // bw intro 1x2
    {n:'bw2', theme:'blue', c:'CAMSAigCEgIIBBIAEgQIBxABEgIoBRIECAcQAhIAEgIIAxICKAI=_0'}, // bw intro 1x2
    {n:'bw3', theme:'blue', c:'CAMSAigCEgIIBBIAEgQIBxABEgIoBRIECAcQARICKAUSBAgHEAISABICCAMSAigC_0'}, // bw intro 1x3
    // 'CAMSAigCEgIIBBIAEgQIBxABEgIoBRIECAcQAhICKAUSBAgHEAESABICCAMSAigC_0', // bw intro 1x3 (middle)
    {n:'bw4', theme:'blue', c:'CAUSAigEEgIIBBIAEgQIBxABEgASBAgHEAESAigHEgQIBxABEgASBAgHEAISABICCAMSAigE_0'}, // bw intro 2x2
    {n:'bw5', theme:'blue', c:'CAcSAigGEgIIBBIAEgQIBxABEgASBAgHEAESABIECAcQARICKAkSBAgHEAESABIECAcQAhIAEgQIBxABEgIoCRIECAcQAhIAEgQIBxACEgASBAgHEAISABICCAMSAigG_0'}, // bw intro 3x3
    {n:'bw6', theme:'blue', c:'CAcSAigIEgQIBxABEgASBAgHEAESABIECAcQARICKAkSBAgHEAESABIECAcQAhIAEgQIBxABEgASAggEEgIoBxIECAcQAhIAEgQIBxACEgASBAgHEAISABICCAMSAigG_0'}, // bw intro 3x3
    {n:'bw7', theme:'blue', c:'CAkSAigCEgIIBBICKAcSBAgHEAESAigDEgQIBxACEgASBAgHEAESAigLEgQIBxABEgASBAgHEAESABIECAcQARIAEgQIBxABEgIoCxIECAcQARIAEgQIBxACEgASBAgHEAESABIECAcQARICKAsSBAgHEAISABIECAcQAhIAEgQIBxACEgASBAgHEAESABICCAMSAigI_0'}, // bw intro 4x4
    {n:'bw8', theme:'blue', c:'CAkSAigKEgQIBxABEgASBAgHEAESABIECAcQAhIAEgQIBxABEgIoDRIECAcQARIAEgQIBxABEgASBAgHEAESAigJEgIIBBIAEgQIBxABEgASBAgHEAISABIECAcQARIAEgQIBxABEgIoCxIECAcQAhIAEgQIBxACEgASBAgHEAISABIECAcQARIAEgIIAxICKAg=_0'}, // bw intro 4x4
    {n:'bw9', theme:'blue', c:'CAkSAigMEgQIBxABEgASBAgHEAISABIECAcQARICKAsSBAgHEAESAigFEgQIBxABEgIoCxIECAcQARIAEgQIBxACEgASBAgHEAESAigNEgQIBxACEgASBAgHEAISABIECAcQAhIAEgQIBxABEgASAggDEgIoBRICCAQSAigC_0'}, // bw 4x4 (group-white)


    {n:'bw-octagon', theme:'blue', c:'CAkSAigIEgIIBBIAEgQIBxACEgASBAgHEAESABIECAcQARIAEgQIBxACEgIoCxIECAcQARIAEgQIBxABEgASBAgHEAESABIECAcQARICKAsSBAgHEAESABIECAcQARIAEgQIBxABEgASBAgHEAESAigLEgQIBxACEgASBAgHEAESABIECAcQARIAEgQIBxACEgASAggDEgIoCA==_0'},

    // dot teaching section
    {n:'dot1', theme:'light-green', c:'CAUSAigEEgIIBBICKAISAggGEgASAggGEgIoChICCAMSAigE_0'}, // dot 2x2

    {n:'dot2', theme:'light-green', c:'CAcSABICCAESAggGEgIoAxICCAQSAggBEgIoChICCAYSAggBEgIoCBICCAYSABICCAYSAigIEgIIARICKAISAggDEgIoBRICCAY=_0'}, // dot 3x3
    {n:'dot3', theme:'light-green', c:'CAcSABICCAESAggGEgIoAxICCAQSAggBEgIoCRICCAESAggGEgIIARICKAgSAggGEgASAggGEgIoCBICCAESAigCEgIIAxICKAUSAggG_0'}, // dot 3x3
    {n:'dot4', theme:'light-green', c:'CAcSABICCAESAggGEgIoBBICCAESAigGEgIIBBIAEgIIAxIAEgIIBhICCAESAigIEgIIBhIAEgIIBhIAEgIIAxICKAYSAggBEgIoCBICCAY=_0'}, // dot 3x3 (2starts)
    {n:'dot5', theme:'light-green', c:'CAcSABICCAESAggGEgASAggDEgASAggDEgIIARICKAYSAggEEgIoAxICCAYSAggBEgIIBhICKAcSAggGEgASAggGEgIoAxICCAMSAigEEgIIARICKAgSAggG_0'}, // dot 3x3 (3 starts)

    {n:'windmill', theme:'light-green', c:'CAsSAigFEgIIBhICKBMSAggFEgIoAxICCAUSAigDEgIIBRIAEgIIBRICKAUSAggFEgASAggFEgIoCxICCAYSAigJEgIIBhICKAsSAggFEgASAggFEgIoBRICCAUSABICCAUSAigDEgIIBRICKAMSAggFEgIoEhICCAMSABICCAQSAigE_0'}, // 5x5

    {n:'bw-dot-goboard', theme:'default', c:'CA8SAggEEgIoDBICCAYSAggEEgASBAgHEAESABIECAcQAhICKAcSBAgHEAESABIECAcQAhICCAYSAigQEgQIBxACEgIoBRIECAcQARIAEgQIBxABEgIoDRICCAMSAigNEgQIBxACEgASBAgHEAISAigiEgIIBhICKAwSAggDEgIIBhICKAYSBAgHEAESAigMEgIIBhICCAMSAigPEgQIBxACEgIoBxIECAcQARICKBASAggGEgIoChIECAcQAhIAEgQIBxABEgASAggDEgIIBhICKAkSAggGEgIoAhICCAQ=_0'},

    // symmetry teaching section (Waterside)
    {n:'symmetry1', theme:'blue-green', c:'CAcSAigCEgIIBBIAEgIIBBICKCUSAggDEgIoBRICCAMYAg==_0'},
    {n:'symmetry2', theme:'blue-green', c:'CAcSAigCEgIIBBIAEgIIBBICKBASAggFEgIoBRICCAUSAigJEgIIBRIAEgIIBRICKAISAggDEgIoBRICCAMYAg==_0'},
    {n:'symmetry3', theme:'blue-green', c:'CAkSAigCEgIIBBICKAMSAggEEgIoChICCAUSAigLEgIIBRICKBUSAggFEgIoCxICCAUSAigIEgIIAxICKAcSAggDGAI=_0'},
    // {n:'symmetry', theme:'blue-green', c:'CAsSAigEEgIIBBIAEgIIBBICCAUSAigdEgIIBRICKAUSAggFEgIoDRICCAUSAigVEgIIBRICKAMSAggFEgIoFxICCAUSABICCAUSAigCEgIIAxICCAUSAigEEgIIAxICKAISAggFEgIoFRgC_0'},
    {n:'symmetry4', theme:'blue-green', c:'CAsSAigDEgIIBRICCAQSABICCAQSAigaEgIIBRICKAMSAggFEgIoGRICCAUSABICCAUSAigTEgIIBRICKAkSAggFEgIoCRICCAUSAigNEgIIBRICKAMSAggFEgIoCRICCAUSAigNEgIIBRICKAcSAggFEgASAggFEgIoBxICCAUSAigMEgIIAxICKAUSAggDEgIoAhgC_0'},
    // Skipping one because it has 2 exits and is long: https://youtu.be/Z6CJZu6omGs?t=5m9s
    {n:'symmetry-rotational', theme:'blue-white', c:'CAcSAigEEgIIBBICCAUSAggDEgIoBBICCAUSAigZEgIIBRICKAQSAggDEgIIBRICCAQSAigEGAQ=_0'},
    {n:'symmetry-rotational2', theme:'blue-green', c:'CAcSAigEEgIIBBICCAUSAggDEgIoEhICCAUSAigDEgIIBRICKAwSAggDEgASAggEEgIoAhICCAUSABgE_0'},
    {n:'symmetry-rotational3', theme:'blue-green', c:'CAkSAggEEgIoBxICCAMSAigEEgIIBRICKAUSAggFEgIoDxICCAUSAigPEgIIBRICKAMSAggFEgIoCRICCAUSAigGEgIIAxICKAYSAggFEgIIBBgE_0'},
    {n:'symmetry-rotational4', theme:'blue-green', c:'CA0SAggEEgIoCxICCAMSAggFEgIoAxICCAUSAigPEgIIBRICKAcSAggFEgIoBxICCAUSAigFEgIIBRICKB8SAggFEgIoBRICCAUSAigPEgIIBRICKAsSAggFEgIoBxICCAUSABICCAUSAigFEgIIBRICKA8SAggFEgIoAhICCAMSAigEEgIIBRICKAYSAggEGAQ=_0'},
    {n:'symmetry-rotational5', theme:'blue-green', c:'CA0SAggEEgIoCxICCAMSAggFEgASAggFEgASAggFEgIoDRICCAUSAigHEgIIBRIAEgIIBRICKA0SAggFEgIoGRICCAUSAigLEgIIBRICKA8SAggFEgIoCRICCAUSABICCAUSAigJEgIIBRICKAMSAggFEgIoFBICCAMSAigEEgIIBRICKAYSAggEGAQ=_0'},


    // Skip Rock for now
    // Skip the Garden
    // Skip Temple of the Sun
    // Skip Monastery

    // Swamp

    // tetris teaching section
    {n:'tetris1', theme:'brown', c:'CAMSAigCEgIIBBICKAcSCQgJIgUIARIBARIAEgIIAxICKAI=_0'}, // tetris 1x2
    {n:'tetris2', theme:'brown', c:'CAMSAigCEgIIBBICKA0SCQgJIgUIARIBARIAEgIIAxICKAI=_0'}, // tetris 1x3
    {n:'tetris3', theme:'brown', c:'CAMSAigCEgIIBBICKA0SCggJIgYIARICAQESABICCAMSAigC_0'}, // tetris 1x3
    {n:'tetris4', theme:'brown', c:'CAUSAigEEgIIBBICKAsSDAgJIggIAhIEAQABARICKAMSAggDEgIoBA==_0'}, // tetris 2x2

    {n:'tetris5', theme:'brown', c:'CAcSAigGEgIIBBICKAwSAggFEgIoBBIMCAkiCAgCEgQBAQEBEgIoBhICCAUSAigKEgIIAxICKAQSAggFEgA=_0'}, // tetris 3x3 (square)
    {n:'tetris6', theme:'brown', c:'CAsSAigKEggIBBoECAIQABICKAQSAggFEgIoAxICCAUSABICCAUSAighEgIIBRICKAQSDggJIgoIAhIGAQEBAAEAEgIoHhICCAUSAigSEgIIAxICKAgSAggFEgA=_0'}, // 5x5 (L)

    // 2-piece tutorial
    {n:'tetris2piece1', theme:'brown', c:'CAMSAigCEgIIBBICKAcSCQgJIgUIARIBARICCAUSAigDEgIIBRIJCAkiBQgBEgEBEgASAggDEgIoAg==_0'}, // 1x3
    {n:'tetris2piece2', theme:'brown', c:'CAMSAigCEgIIBBICKAcSCQgJIgUIARIBARICKAISAggFEgIoAhIJCAkiBQgBEgEBEgASAggDEgIoAg==_0'}, // 1x3
    {n:'tetris2piece3', theme:'brown', c:'CAUSAigEEgIIBBICKA0SCQgJIgUIARIBARICKAcSDAgJIggIAhIEAQABARICKAMSAggDEgIoBA==_0'}, // 2x3
    {n:'tetris2piece4', theme:'brown', c:'CAcSAigGEgIIBBIAEgoICSIGCAISAgEBEgIoGxIMCAkiCAgCEgQBAQEBEgIoBRICCAMSAigG_0'}, // 3x3 square-and-2
    {n:'tetris2piece5', theme:'brown', c:'CAcSAigGEgIIBBICKAMSCggJIgYIAhICAQESAigZEgwICSIICAISBAEBAQESAigFEgIIAxICKAY=_0'}, // 3x3 square-and-2-part2
    {n:'tetris2piece6', theme:'brown', c:'CAcSAigGEgIIBBICKB0SDAgJIggIAhIEAQEBARIAEgoICSIGCAISAgEBEgIoAxICCAMSAigG_0'}, // 3x3 square-and-2-part3
    {n:'tetris2piece7', theme:'brown', c:'CAcSAigGEgIIBBICKA8SDAgJIggIAhIEAQEBARIAEgsICSIHCAMSAwEBARICKBESAggDEgIoBg==_0'}, // 3x3 square-and-3
    {n:'tetris2piece8', theme:'brown', c:'CAcSAigGEgIIBBIAEgoICSIGCAISAgEBEgIoHxIMCAkiCAgCEgQBAQEBEgASAggDEgIoBg==_0'}, // 4x4 square-and-2-part3



    {n:'tetris-red1', theme:'dark-red', c:'CAkSAigIEgIIBBICKBMSDAgJIggIBBIEAQEBARICKAQSAggFEgIoIBILCAkiBwgBEgMBAQESABILCAkiBwgBEgMBAQESAigDEgIIAxICKAg=_0'}, // 4x4
    {n:'tetris-red2', theme:'dark-red', c:'CAkSAigIEgIIBBICKBMSDAgJIggIBBIEAQEBARICKAISAggFEgIoIhILCAkiBwgBEgMBAQESABILCAkiBwgBEgMBAQESAigDEgIIAxICKAg=_0'}, // 4x4
    {n:'tetris-red3', theme:'dark-red', c:'CAsSAigKEggIBBoECAIQABICKAkSDAgJIggIARIEAQEBARICKCcSCQgJIgUIARIBARICKCsSCggJIgYIAhICAQESAigFEgIIAxICKAo=_0'}, // 5x5
    {n:'tetris-red-corners', theme:'dark-red', c:'CAsSAigKEggIBBoECAIQABIAEg4ICSIKCAMSBgEBAQAAARICKAcSCggJIgYIAhICAQESAihREgsICSIHCAESAwEBARICKAUSCwgJIgcIAxIDAQEBEgASAggDEgIoCg==_0'}, // 5x5

    {n:'tetris-optional1', theme:'brown', c:'CAsSAigKEggIBBoECAIQABIAEg4ICSIKCAMSBgEAAAEBARICKAcSDAgJIggIARIEAQEBARICKE8SDggJIgoIAxIGAQEBAQAAEgIoCRICCAMSAigK_0'}, // 5x5
    {n:'tetris-optional1-squished', theme:'brown', c:'CAkSAigIEgIIBBIAEg4ICSIKCAMSBgEAAAEBARICKAUSDAgJIggIARIEAQEBARICKC8SDggJIgoIAxIGAQEBAQAAEgIoBxICCAMSAigI_0'}, // 4x4

    {n:'tetris-just-tetris-pieces', theme:'brown', c:'CAsSAigKEgIIBBICKAMSDggJIgoIAxIGAQEBAAABEgIoKxIMCAkiCAgCEgQBAQEBEgIoAxIOCAkiCggCEgYBAAEBAAESABIMCAkiCAgBEgQBAQEBEgIoDRIOCAkiCggDEgYBAQEBAAASAigtEg4ICSIKCAMSBgABAAEBARICKAMSDggJIgoIAxIGAQEAAAEBEgIoAxICCAMSAigK_0'}, // 5x6 just-tetris-pieces


    {n:'tetris-fun-lr', theme:'brown', c: 'CAkSAigIEgIIBBICKDcSDggJIgoIAhIGAQABAAEBEgIoBRIOCAkiCggCEgYBAQEAAQASABICCAMSAigI_0'},

    {n:'tetris-fill', theme:'brown', c:'CAcSAigGEgIIBBICKAUSCQgJIgUIARIBARICKAkSEQgJIg0IAxIJAQEBAQABAQEBEgIoExICCAMSAigG_0'}, // 3x3
    {n:'tetris-fill2', theme:'brown', c:'CAcSAigGEgIIBBICKB8SDAgJIggIAhIEAAEBABIAEgwICSIICAISBAEAAAESABICCAMSAigG_0'}, // 3x3
    {n:'tetris-fill3', theme:'brown', c:'CAkSAigIEgIIBBIAEgkICSIFCAESAQESAigDEgwICSIICAQSBAEBAQESAigfEg4ICSIKCAISBgABAQABABICKBkSAggDEgIoCA==_0'},
    {n:'tetris-fill4', theme:'brown', c:'CAkSAigIEgIIBBIAEhEICSINCAMSCQEBAQAAAQAAARICKBcSCwgJIgcIARIDAQEBEgIoDRIQCAkiDAgEEggBAAABAQAAARICKBcSAggDEgIoCA==_0'},

    {n:'tetris-rotate', theme:'brown', c:'CAMSAigCEgIIBBICKBMSDggJIgoIARIEAQEBARgBEgASAggDEgIoAg==_0'},
    {n:'tetris-rotate2', theme:'brown', c:'CAUSAigEEgIIBBICKBUSEAgJIgwIAxIGAQEBAAABGAESAigDEgIIAxICKAQ=_0'},
    {n:'tetris-rotate3', theme:'brown', c:'CAkSAigIEgIIBBIAEhAICSIMCAISBgEBAQABABgBEgASEAgJIgwIAhIGAQEBAAEAGAESAigaEgIIBRICKBMSAggFEgIoDBICCAMSAigI_0'},
    {n:'tetris-rotate4', theme:'brown', c:'CAsSAigKEgIIBBICKAQSAggFEgIoAxICCAUSABICCAUSAigLEgIIBRICKBoSEAgJIgwIAhIGAQEBAAEAGAESAigSEgIIBRICKB4SAggDEgIoBhICCAUSAigD_0'},


    {n:'tetris-rotate-fun', theme:'brown', c:'CAsSAigKEgIIBBIAEg4ICSIKCAESBAEBAQEYARICCAUSAigEEg4ICSIKCAISBAEBAAEYARICCAUSAihREgIIBRICKAISEAgJIgwIAhIGAAEAAQEBGAESAigCEgIIBRICKAISAggDEgIoCg==_0'},
    {n:'tetris-rotate-fun2', theme:'brown', c:'CAsSAigKEgIIBBICKBcSEAgJIgwIAxIGAAEAAQEBGAESAigbEhIICSIOCAISCAEAAQABAAEBGAESAiglEg4ICSIKCAISBAABAQAYARICKAkSAggDEgIoCg==_0'},
    {n:'tetris-rotate-fun3', theme:'brown', c:'CAsSAigKEgIIBBICKAcSEAgJIgwIAxIGAAABAQEBGAESAigGEgIIBRICKBsSAggFEgIoAhIQCAkiDAgDEgYAAAEBAQEYARICKBYSAggFEgIoDxICCAUSAigEEhAICSIMCAISBgEBAQEBARgBEgIoCRICCAMSAigK_0'},
    {n:'tetris-rotate-fun4', theme:'brown', c:'CAsSAigKEgIIBBICKAUSCwgJIgcIARIBARgBEgIoJxIQCAkiDAgCEgYAAQEAAAEYARICKAcSEAgJIgwIAhIGAQAAAQEAGAESAignEhMICSIPCAMSCQEBAQEAAAEAABgBEgIoBRICCAMSAigK_0'},


    {n:'tetris-hole1', theme:'default', c:'CAMSAigCEgIIBBICKAcSCwgJIgcIARIBASABEgIoBRINCAkiCQgBEgMBAQEYARIAEgIIAxICKAI=_0'},
    {n:'tetris-hole2', theme:'default', c:'CAMSAigCEgIIBBICKA0SDggJIgoIARIEAQEBARgBEgIoBRIMCAkiCAgBEgIBASABEgASAggDEgIoAg==_0'},
    {n:'tetris-hole', theme:'default', c:'CAUSAigEEgIIBBICKAsSDAgJIggIAhIEAQEBARIAEgsICSIHCAESAQEgARIAEgIIAxICKAQ=_0'},
    // This one shows that the JS is broken. Should be able to wirk with 4 squared and a blue-2 but doesn't. So, I simplified the puzzle
    {n:'tetris-hole3', theme:'default', c:'CAkSAigIEgIIBBICKCsSDAgJIggIAhICAQEgARICKA8SDAgJIggIAhIEAQEBARIAEgwICSIICAISBAEBAQESABICCAMSAigI_0'},
    {n:'tetris-hole4', theme:'default', c:'CAkSAigIEgIIBBICKAcSGAgJIhQIBBIQAQEBAQEAAAEBAAABAQEBARICKC8SCwgJIgcIARIBASABEgIoBxICCAMSAigI_0'},


    {n:'tetris-hole-fun', theme:'default', c:'CAkSAigIEgIIBBICKAMSCwgJIgcIARIBASABEgIoIxIMCAkiCAgEEgQBAQEBEgIoERIMCAkiCAgBEgQBAQEBEgIoBRICCAMSAigI_0'},
    {n:'tetris-hole-fun2', theme:'default', c:'CAkSAigIEgIIBBICKAUSDAgJIggIBBIEAQEBARICKCMSCwgJIgcIARIBASABEgIoERILCAkiBwgBEgEBIAESABIMCAkiCAgBEgQBAQEBEgASAggDEgIoCA==_0'},
    // No clue how I solved this one but the blue square validation logic is broken
    // {n:'tetris-hole-fun3', theme:'default', c:'CAkSAigIEgIIBBICKAUSCwgJIgcIARIBASABEgASDAgJIggIBBIEAQEBARICKCESEQgJIg0IAxIJAAEBAAEAAQEAEgIoFRICCAMSAigI_0'},
    // Skipping a 2x2 blue square puzzle here at https://www.youtube.com/watch?v=2j4n78yxzRE&index=12&list=PLGKJJhcJXlNw2Fi_7syjV1OHcm31iaJI0
    {n:'tetris-hole-fun4', theme:'default', c:'CAkSAggEEgIoCRIYCAkiFAgEEhABAAEAAAEAAQEAAQAAAQABEgIoAxILCAkiBwgBEgEBIAESAigTEg4ICSIKCAMSBgEBAQABABICKAsSCwgJIgcIARIBASABEgIoGRICCAMSAigI_0'},

    // This one is also broken because of the blue squares bug. it's a 4x4 yellow square with a blue 2x3 L
    // {n:'tetris-hole-fun5-big-square', theme:'default', c:''},


    // TODO: The implementation is buggy here for cancelling out blue polyaminos ("Missing Feature")
    {n:'tetris-hole-zero', theme:'default', c:'CAMSAigCEgIIBBICKAcSDAgJIggIARICAQEgARICKAUSCggJIgYIARICAQESABICCAMSAigC_0'},
    {n:'tetris-hole-zero2', theme:'default', c:'CAUSAigEEgIIBBIAEgsICSIHCAESAQEgARICKAkSCwgJIgcIARIBASABEgIoCRIKCAkiBggBEgIBARICKAMSAggDEgIoBA==_0'},
    {n:'tetris-hole-zero3', theme:'default', c:'CAkSAigIEgIIBBIAEgsICSIHCAESAQEgARICKAMSDAgJIggIAhIEAQEBARICKB8SDAgJIggIAhIEAQABARICKBMSDAgJIggIARICAQEgARICKAMSCwgJIgcIARIBASABEgASAggDEgIoCA==_0'},
    {n:'tetris-hole-zero4', theme:'default', c:'CAsSAigHEgIIBRICKAISAggEEgASDAgJIggIAhIEAQEBARICKAUSCwgJIgcIARIBASABEgIoDxIMCAkiCAgBEgIBASABEgIoBxILCAkiBwgBEgEBIAESAggFEgIoEhIOCAkiCggCEgQBAQEAIAESAigTEgwICSIICAISBAABAQESAigFEgIIAxICKAo=_0'},


    // PHIL: Stopped here TODO at https://www.youtube.com/watch?v=qJlG-lrNw_Y&index=13&list=PLGKJJhcJXlNw2Fi_7syjV1OHcm31iaJI0


    // {n:'tetris6', theme:'brown', c:'CAcSAigDEgIIBRICKAISAggEEgIoBhICCAUSAigKEgwICSIICAISBAEBAQESAigREgIIAxICKAQSAggFEgA=_0'}, // tetris 3x3
    // {n:'tetris7', theme:'brown', c:'CAsSAigKEgIIBBICKAoSAggFEgIoCxICCAUSAigaEg4ICSIKCAISBgEBAQABABICKBYSAggFEgIoGhICCAMSAigIEgIIBRIA_0'}, // tetris 5x5
    // {n:'tetris8', theme:'brown', c:'CAsSAigKEgIIBBICKAoSAggFEgIoCxICCAUSAigaEg4ICSIKCAISBgEBAQABABICKBISAggFEgIoAxICCAUSAigaEgIIAxICKAgSAggFEgA=_0'}, // tetris 5x5

    // TODO: add more tutorials: https://www.youtube.com/watch?v=-nuJqaDPJ9c&list=PLGKJJhcJXlNw2Fi_7syjV1OHcm31iaJI0&index=11


    // // 2 piece tetris tutorial
    // {n:'tetris2piece1', theme:'brown', c:'CAMSAigCEgIIBBIAEgkICSIFCAESAQESAigFEgkICSIFCAESAQESABICCAMSAigC_0'}, // 1x2
    // {n:'tetris2piece2', theme:'brown', c:'CAMSAigCEgIIBBIAEgkICSIFCAESAQESAigLEgkICSIFCAESAQESABICCAMSAigC_0'}, // 1x3
    // {n:'tetris2piece3', theme:'brown', c:'CAcSAigGEgIIBBICKAMSCggJIgYIAhICAQESAigZEgoICSIGCAISAgEBEgIoBRICCAMSAigG_0'}, // 3x3
    // {n:'tetris2piece4', theme:'brown', c:'CAcSAigGEgIIBBICKBMSCggJIgYIAhICAQESAigJEgoICSIGCAISAgEBEgIoBRICCAMSAigG_0'}, // 3x3
    // {n:'tetris2piece5', theme:'brown', c:'CAkSAigIEgIIBBICKCcSCwgJIgcIAxIDAQEBEgIoAxILCAkiBwgBEgMBAQESAigTEgIIAxICKAg=_0'}, // 4x4
    // {n:'tetris2piece6', theme:'brown', c:'CAkSAigIEgIIBBICKBgSAggFEgIoDhILCAkiBwgDEgMBAQESAigDEgsICSIHCAESAwEBARICKBMSAggDEgIoCA==_0'}, // 4x4
    //
    // // multi-piece not-exactly-tutorial
    // {n:'tetris-mine1', theme:'brown', c:'CAsSAigKEgIIBBICKBASAggFEgIoCBIKCAkiBggCEgIBARICKAISAggFEgIoEhIMCAkiCAgCEgQBAAEBEgIoGRIMCAkiCAgCEgQBAQEBEgIoGRICCAMSAigK_0'}, // 4x4 (3 pieces all moved)
    // {n:'tetris-mine2', theme:'brown', c:'CAsSAigKEgIIBBICKBkSCggJIgYIAhICAQESAigTEgwICSIICAISBAEAAQESAigbEgwICSIICAISBAEBAQESAigZEgIIAxICKAo=_0'}, // 5x5 all pieces moved (maybe duplicate)


    // Skip Greenhouse
    // Tree house

    {n:'star1', theme:'treehouse', c:'CAMSAigCEgIIBBIAEgQICBAGEgIoBRIECAgQBhIAEgIIAxICKAI=_0'},
    {n:'star2', theme:'treehouse', c:'CAkSAigIEgIIBBIAEgQICBAGEgIoOxIECAgQBhIAEgIIAxICKAg=_0'},
    {n:'star3', theme:'treehouse-yellow', c:'CAcSAigCEgIIBBICKAQSAggFEgQICBAJEgIoBBICCAUSAigPEgIIBRICKAMSAggFEgIoBhIECAgQCRICKAISAggFEgIoAhICCAMSAigC_0'},
    {n:'star4', theme:'treehouse-yellow', c:'CAkSAigEEgIIBBICCAUSAigDEgIIBRICKAUSAggFEgIoBRICCAUSAigDEgIIBRICKAgSBAgIEAkSAigSEgIIBRICKAMSAggFEgIoBhIECAgQCRICKAoSAggFEgIIAxICKAQ=_0'},
    {n:'star5', theme:'treehouse-yellow', c:'CAUSAigCEgIIBBICKAMSBAgIEAkSABIECAgQCRICKAQSAggFEgIoAhIECAgQCRIAEgQICBAJEgIoAxICCAMSAigC_0'},
    {n:'star6', theme:'treehouse-yellow', c:'CAUSAigCEgIIBBICKAMSBAgIEAkSAggFEgQICBAJEgIoBxIECAgQCRIAEgQICBAJEgIoAxICCAMSAigC_0'},
    {n:'star7', theme:'treehouse-yellow', c:'CAkSABICCAUSAigCEgIIBBICKAUSBAgIEAkSAggFEgASAggFEgIoAhIECAgQCRICKAYSAggFEgIoCRICCAUSAigFEgIIBRICKAcSAggFEgIoCxICCAUSAigEEgQICBAJEgIoBRIECAgQCRICKAUSAggDEgIoAhICCAUSAA==_0'},
    {n:'star8', theme:'treehouse-yellow', c:'CAkSAigEEgIIBBICKAISAggFEgIoAhIECAgQCRICCAUSABICCAUSABICCAUSBAgIEAkSAigKEgIIBRICKBMSAggFEgIoEBIECAgQCRICKAUSBAgIEAkSAggFEgIoBBICCAMSAigE_0'},
    {n:'star9', theme:'treehouse-yellow', c:'CAcSAigEEgIIBBICKAMSBAgIEAkSAigDEgQICBAJEgIoCRIECAgQCRICKAMSBAgIEAkSAigJEgQICBAJEgIoAxIECAgQCRICKAMSAggDEgIoBA==_0'},
    {n:'star10', theme:'treehouse-yellow', c:'CAcSAigCEgIIBBICKAUSBAgIEAkSABIECAgQCRIAEgQICBAJEgIoFxIECAgQCRIAEgQICBAJEgASBAgIEAkSAigDEgIIAxICKAQ=_0'},
    {n:'star11', theme:'treehouse-yellow', c:'CAkSAigEEgIIBBICKAUSBAgIEAkSAigFEgQICBAJEgIoCxIECAgQCRICKAUSBAgIEAkSAigLEgQICBAJEgASBAgIEAkSAigDEgQICBAJEgIoERIECAgQCRICKAUSAggDEgIoBA==_0'},
    {n:'star12', theme:'treehouse', c:'CAkSAigIEgIIBBIAEgQICBAJEgASBAgIEAkSABIECAgQCRIAEgQICBAJEgIoCxIECAgQCRICKBESBAgIEAkSAigREgQICBAJEgASBAgIEAkSAigFEgIIAxICKAg=_0'},

    {n:'star-dot1', theme:'treehouse-violet', c:'CAcSABICCAESAggGEgIoAxICCAQSAggBEgIoChICCAYSAggBEgIoBBIECAgQCRICKAMSAggGEgASAggGEgIoBRIECAgQCRICKAISAggBEgIoAhICCAMSAigG_0'},
    {n:'star-dot2', theme:'treehouse-violet', c:'CAcSABICCAESAggGEgIoAxICCAQSAggBEgIoChICCAYSAggBEgIoBBIECAgQCRICKAMSAggGEgASAggGEgIoCBICCAESBAgIEAkSABICCAMSAigFEgIIBg==_0'},
    {n:'star-dot3', theme:'treehouse-violet', c:'CAkSAggGEgIoAxICCAQSAigDEgIIBhICKAUSBAgIEAkSAigxEgQICBAJEgIoBxICCAYSAigDEgIIAxICKAMSAggG_0'},
    {n:'star-dot4', theme:'treehouse-violet', c:'CAkSAggGEgIoAxICCAQSAigDEgIIBhIAEgQICBAJEgIoBRIECAgQCRICKC8SBAgIEAkSAigFEgQICBAJEgASAggGEgIoAxICCAMSAigDEgIIBg==_0'},
    {n:'star-dot5', theme:'treehouse-violet', c:'CAsSAggGEgIoBRICCAQSAigDEgIIBhIAEgQICBAJEgIoBxIECAgQCRICKBsSAggGEgASAggGEgIoCRIECAgQCRICKAkSAggGEgASAggGEgIoIxIECAgQCRIAEgIIBhICKAMSAggDEgIoBRICCAY=_0'},
    // start of using bw
    {n:'star-bw1', theme:'treehouse-violet', c:'CAcSAigCEgIIBBICKAUSBAgIEAkSAigNEgQIBxACEgASBAgHEAESAigPEgQICBAJEgIoBRICCAMSAigC_0'},
    {n:'star-bw2', theme:'treehouse-violet', c:'CAcSAigCEgIIBBICKAUSBAgHEAISAigDEgQIBxABEgIoCRIECAgQCRICKAMSBAgIEAkSAigJEgQIBxACEgIoAxIECAcQARICKAUSAggDEgIoAg==_0'},
    {n:'star-bw3', theme:'treehouse-violet', c:'CAcSAigCEgIIBBICKAUSBAgHEAISABIECAgQCRIAEgQIBxABEgIoCRIECAgQCRICKAMSBAgIEAkSAigJEgQIBxACEgASBAgIEAkSABIECAcQARICKAUSAggDEgIoAg==_0'},
    {n:'star-bw4', theme:'treehouse-violet', c:'CAcSAigEEgIIBBICKAMSBAgHEAkSABIECAgQAhIAEgQIBxABEgIoCRIECAgQAhICKAMSBAgIEAISAigJEgQIBxABEgASBAgIEAISABIECAcQCRICKAUSAggDEgIoAg==_0'},
    {n:'star-bw5', theme:'treehouse-violet', c:'CAcSAigCEgIIBBICKAUSBAgIEAUSABIECAcQBBIAEgQICBAFEgIoCRIECAcQBhICKAMSBAgHEAYSAigJEgQICBAFEgASBAgHEAQSABIECAgQBRICKAUSAggDEgIoAg==_0'},
    {n:'star-bw6', theme:'treehouse-violet', c:'CAsSAigKEgIIBBIAEgQICBAEEgASBAgIEAQSABIECAcQBRICKBESBAgHEAUSABIECAcQBRIAEgQIBxAFEgASBAgIEAQSABIECAcQCRICKA0SBAgIEAQSABIECAgQBBICKAMSBAgIEAQSABIECAcQCRICKA0SBAgHEAkSABIECAcQCRICKAcSAggDEgIoCg==_0'},
    {n:'star-bw7', theme:'treehouse-violet', c:'CAsSAigKEgIIBBIAEgQICBAEEgASBAgIEAQSABIECAcQBRICKBESBAgHEAUSABIECAcQBRIAEgQIBxAFEgASBAgIEAQSABIECAcQCRICKA0SBAgIEAQSABIECAgQBBICKAMSBAgIEAQSAggFEgQIBxAJEgIoBBICCAUSAigIEgQIBxAJEgASBAgHEAkSAigHEgIIAxICKAo=_0'},

    {n:'star-bw8', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgHEAESABIECAcQARIAEgQIBxACEgASBAgHEAISAigLEgQIBxABEgASBAgHEAESABIECAcQAhIAEgQIBxACEgIoHRIECAgQAhICKAUSBAgIEAISAigFEgIIAxICKAQ=_0'},
    {n:'star-bw9', theme:'treehouse-lightgreen', c:'CAkSAigEEgIIBBICKAUSBAgHEAESABIECAcQARIAEgQIBxACEgASBAgHEAISAigLEgQIBxABEgASBAgHEAESABIECAcQAhIAEgQIBxACEgIoCxIECAgQCRICKAUSBAgIEAkSAigFEgIIAxICKAQ=_0'},
    {n:'star-bw10', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgHEAESABIECAcQARIAEgQIBxACEgASBAgHEAISAigLEgQIBxABEgASBAgHEAESABIECAcQAhIAEgQIBxACEgIoCxIECAgQARICKAUSBAgIEAESAigFEgIIAxICKAQ=_0'},
    {n:'star-bw11', theme:'treehouse-lightgreen', c:'CAkSAigEEgIIBBICKAUSBAgHEAESABIECAcQARIAEgQIBxACEgASBAgHEAISAigLEgQIBxABEgASBAgHEAESABIECAcQAhIAEgQIBxACEgIoIxIECAgQARICKAUSAggDEgIoBA==_0'},
    {n:'star-bw12', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgHEAISABIECAcQARICKAkSBAgIEAISAigDEgIIAxICKAI=_0'},
    {n:'star-bw13', theme:'treehouse-orange', c:'CAcSAigEEgIIBBICKAcSBAgHEAQSAigJEgQICBAEEgIoAxIECAcQBRICKA0SBAgHEAISAigDEgIIAxICKAQ=_0'},
    {n:'star-bw14', theme:'treehouse-lightgreen', c:'CAcSAigEEgIIBBICKAcSBAgHEAQSAigJEgQICBAEEgIoAxIECAcQBRICKAkSBAgIEAQSAigDEgQIBxACEgIoAxICCAMSAigE_0'},
    {n:'star-bw15', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgHEAQSAigjEgQIBxAFEgASBAgHEAUSAigPEgQIBxAEEgIoBRIECAcQBRICKAUSAggDEgIoBA==_0'},
    // a fork, and 1 alternative
    {n:'star-bw16', theme:'treehouse-orange', c:'CAsSAigEEgIIBBIAEgIIBBICKAUSBAgIEAQSAigDEgQIBxAEEgIoFRIECAcQBBICKBESBAgHEAUSABIECAcQBRICKAMSBAgHEAUSABIECAcQBRICKBESBAgHEAQSAigVEgQIBxAEEgIoAxIECAgQBBICKAUSAggDEgASAggDEgIoBA==_0'},
    {n:'star-bw17', theme:'treehouse-orange', c:'CAsSAigMEgQICBAEEgIoAxIECAcQBBICKBUSBAgHEAQSAigFEgIIBBICKAkSAggEEgASBAgHEAUSABIECAcQBRICKAMSBAgHEAUSABIECAcQBRIAEgIIBBICKAkSAggEEgIoBRIECAcQBBICKBUSBAgHEAQSAigDEgQICBAEEgIoBRICCAMSABICCAMSAigE_0'},
    {n:'star-bw18', theme:'treehouse-lightgreen', c:'CAcSAigCEgIIBBICKAUSBAgIEAQSAigNEgQIBxAFEgIoAxIECAcQBRICKAkSBAgHEAQSAigDEgQICBAEEgIoBRICCAMSAigC_0'},
    {n:'star-bw19', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgIEAQSABIECAgQBRICKAcSBAgHEAUSABIECAcQBBICKAcSBAgIEAQSABIECAgQBRICKAMSAggDEgIoAg==_0'},
    {n:'star-bw20', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgIEAESAigFEgQIBxABEgIoCxIECAcQAhIAEgQIBxACEgASBAgIEAESAigNEgQIBxABEgIoAxIECAcQAhICKA8SBAgHEAESABIECAcQAhIAEgQICBABEgIoBRICCAMSAigE_0'},
    {n:'star-bw21', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgIEAESAigFEgQIBxABEgIoCxIECAcQAhIAEgQIBxACEgASBAgHEAESAigNEgQICBABEgIoAxIECAcQAhICKA8SBAgIEAESABIECAcQAhIAEgQICBABEgIoBRICCAMSAigE_0'},
    {n:'star-bw22', theme:'treehouse-lightgreen', c:'CAkSAigEEgIIBBICKAkSBAgHEAISAigNEgQIBxACEgASBAgHEAISABIECAcQARICKA0SBAgIEAESAigDEgQIBxACEgIoDxIECAgQARIAEgQIBxACEgASBAgIEAESAigFEgIIAxICKAQ=_0'},
    {n:'star-bw23', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAsSBAgHEAESAigLEgQICBACEgASBAgIEAISABIECAcQAhICKA0SBAgHEAESAigDEgQICBACEgIoDxIECAcQARIAEgQICBACEgIoBxICCAMSAigE_0'},


    // 2-color stars
    {n:'star-dual1', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgIEAkSABIECAgQBBICKAQSAggFEgIoAhIECAgQCRIAEgQICBAEEgIoAxICCAMSAigC_0'},
    {n:'star-dual2', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgIEAkSAggFEgQICBAEEgIoBxIECAgQCRIAEgQICBAEEgIoAxICCAMSAigC_0'},
    {n:'star-dual3', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgIEAQSAggFEgQICBAJEgIoBxIECAgQBBIAEgQICBAJEgIoBxIECAgQCRIAEgQICBAJEgIoAxICCAMSAigC_0'},
    // This is a fork. Showing both options
    {n:'star-dual4', theme:'treehouse-orange', c:'CAUSAigCEgIIBBICKAMSBAgIEAQSABIECAgQBBICKAcSBAgIEAQSABIECAgQBBICKAcSBAgIEAkSAggFEgQICBAJEgIoBxIECAgQCRIAEgQICBAJEgIoAxICCAMSAigC_0'},
    {n:'star-dual5', theme:'treehouse-orange', c:'CAUSABICCAUSABICCAUSAigCEgQICBAEEgASBAgIEAQSAigHEgQICBAEEgASBAgIEAQSABICCAQSAigDEgIIBBIAEgQICBAJEgASBAgIEAkSAigHEgQICBAJEgASBAgIEAkSAigDEgIIAxICKAI=_0'},
    {n:'star-dual6', theme:'treehouse-lightgreen', c:'CAkSAigEEgIIBBICKAUSBAgIEAkSABIECAgQBBICKA8SBAgIEAQSAigXEgQICBAEEgIoDxIECAgQBBIAEgQICBAJEgIoBRICCAMSAigE_0'},
    {n:'star-dual7', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgIEAkSABIECAgQBBICKAMSBAgIEAkSAigLEgQICBAEEgASBAgIEAQSAigTEgQICBAEEgASBAgIEAQSAigLEgQICBAJEgIoAxIECAgQBBIAEgQICBAJEgIoBRICCAMSAigE_0'},
    {n:'star-dual8', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgIEAkSABIECAgQCRIAEgQICBAEEgASBAgIEAQSAigLEgQICBAJEgIoBRIECAgQBBICKAsSBAgIEAQSAigFEgQICBAJEgIoCxIECAgQBBIAEgQICBAEEgASBAgIEAkSABIECAgQCRICKAUSAggDEgIoBA==_0'},
    {n:'star-dual9', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAcSBAgIEAkSABIECAgQCRIAEgQICBAEEgIoCxIECAgQCRIAEgQICBAEEgIoAxIECAgQCRICKAsSBAgIEAkSAigDEgQICBAEEgASBAgIEAkSAigLEgQICBAEEgASBAgIEAkSABIECAgQCRICKAcSAggDEgIoBA==_0'},
    {n:'star-dual10', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAISAggFEgIoAhIECAgQBBICKAUSBAgIEAQSAigKEgIIBRIECAgQBRICKAMSBAgIEAkSAigREgQICBAFEgIoDRIECAgQCRICKAsSAggDEgIoBA==_0'},
    {n:'star-dual11', theme:'treehouse-orange', c:'CAkSAigEEgIIBBICKAUSBAgIEAQSABIECAgQBBIAEgQICBAFEgASBAgIEAUSAigLEgQICBAEEgASBAgIEAQSABIECAgQBhIAEgQICBAGEgIoCxIECAgQBhIAEgQICBAGEgASBAgIEAYSABIECAgQBhICKAUSAggDEgIoBA==_0'},
    {n:'star-dual12', theme:'treehouse-lightgreen', c:'CAkSAigEEgIIBBICKAcSBAgIEAYSABIECAgQBBICKA0SBAgIEAYSABIECAgQBRIAEgQICBAFEgASBAgIEAQSAigLEgQICBAGEgASBAgIEAUSABIECAgQBRIAEgQICBAEEgIoDRIECAgQBhIAEgQICBAEEgIoBxICCAMSAigE_0'},




    {n:'star-tetris1', theme:'treehouse-green', c:'CAkSAigEEgIIBBICKAUSBAgIEAQSAigREgsICSIHCAMSAwEBARICKAMSBAgIEAQSAigTEgoICSIGCAISAgEBEgIoFxICCAMSAigE_0'},
    {n:'star-tetris2', theme:'treehouse-green', c:'CAkSAigEEgIIBBICKAUSBAgIEAQSAigTEg4ICSIKCAISBgABAQEAARICKBUSCwgJIgcIARIDAQEBEgIoBhICCAUSAigKEgQICBAEEgIoAxICCAMSAigG_0'},
    {n:'star-tetris3', theme:'treehouse-green', c:'CAkSAigEEgIIBBICKAsSBAgIEAQSAigNEgwICSIICAQSBAEBAQESAigjEgQICBAEEgASEAgJIgwIAxIGAAABAQEBGAESAigDEgIIAxICKAg=_0'},
    // The following is a 3-way fork and 1 alternative
    {n:'star-tetris4', theme:'treehouse-lightgreen', c:'CAsSAigEEgIIBBIAEgIIBBICKAkSBAgIEAQSAigVEgQICBAEEgIoERIECAgQBBIAEgQICBAEEgASFggJIhIIAxIMAQABAQABAQEBAQEBGAESABIECAgQBBIAEgQICBAEEgIoMRICCAMSABICCAMSAigE_0'},
    // {n:'star-tetris5', theme:'treehouse-lightgreen', c:'CAsSAigQEgQICBAEEgIoFRIECAgQBBICKAUSAggEEgIoCRICCAQSABIECAgQBBIAEgQICBAEEgASFggJIhIIAxIMAQABAQABAQEBAQEBGAESABIECAgQBBIAEgQICBAEEgASAggEEgIoCRICCAQSAiglEgIIAxIAEgIIAxICKAQ=_0'},
    {n:'star-tetris6', theme:'treehouse-green', c:'CA0SAigGEgIIBBICKAsSCwgJIgcIAxIDAQEBEgIoBRIECAgQBBICKBMSBAgIEAQSAigZEgsICSIHCAESAwEBARICKDMSDggJIgoIAxIGAQEBAAABEgIoFRIECAgQBBICKAkSBAgIEAQSAigHEgIIAxICKAY=_0'},
    {n:'star-tetris7', theme:'treehouse-lightgreen', c:'CAsSAigGEgIIBBICKAcSBAgIEAUSAigTEgQICBAEEgIoGxIQCAkiDAgCEgYBAQEAAQAYARIAEgQICBAFEgIoDxIQCAkiDAgDEgYBAQEBAAAYARICKBkSCggJIgYIARICAQESABIECAgQBBICKAUSAggDEgIoBg==_0'},

    // // Star tutorial (made by me)
    // {n:'star1', c:'CAMSAigEEgQICBAIEgASAggDEgASAggEEgASBAgIEAgSAigE_0'}, // 1x2
    // {n:'star2', c:'CAUSAigEEgIIBBIAEgQICBAIEgASBAgIEAgSAigHEgQICBAIEgASBAgIEAgSABICCAMSAigE_0'}, // 2x2
    // {n:'star3', c:'CAcSAigGEgIIBBICKA8SBAgIEAgSABIECAgQCBIAEgQICBAIEgIoCxIECAgQCBICKAMSAggDEgIoBg==_0'}, // 3x3
    // {n:'star4', c:'CAcSAigGEgIIBBIAEgQICBAFEgASBAgIEAgSABIECAgQCBICKAkSBAgIEAUSAigDEgQICBAFEgIoCRIECAgQCBIAEgQICBAIEgASBAgIEAUSABICCAMSAigG_0'}, // 3x3 2-colors
    // {n:'star5', c:'CAkSAigIEgIIBBIAEgQICBACEgASBAgIEAISABIECAgQAhIAEgQICBACEgIoCxIECAgQARIAEgQICBABEgASBAgIEAYSABIECAgQBhICKAsSBAgIEAUSABIECAgQCBIAEgQICBAIEgASBAgIEAYSAigLEgQICBAFEgASBAgIEAgSABIECAgQCBIAEgQICBAGEgASAggDEgIoCA==_0'}, // 4x4 4-colors
    //
    //
    // // star and square example
    // {n:'starsquare', c:'CAUSAigEEgIIBBIAEgQIBxABEgIoCxIECAgQAhICKAcSBAgHEAISAigDEgIIAxICKAQ=_0'}, // 1x3



  {n:'', c:'CAkSAigEEggIBBoECAAQARICKAUSBAgIEAUSABIECAgQCBIAEgQICBAIEgASBAgIEAISAigLEgQICBAFEgIIBhIECAgQCBIAEgQICBAIEgIIBhIECAgQAhICKAsSBAgIEAUSABIECAgQAxIAEgQICBADEgASBAgIEAISAigLEgQICBAFEgASBAgIEAMSABIECAgQAxIAEgQICBACEgIoBRICCAMSAigE_0'}, // surfing

  // The Quary



  {n:'', c:'CAcSAigGEggIBBoECAIQABICKAISAggGEgIoBhICCAYSAigDEgIIBhICKAMSAggKEgIoAhICCAYSAigCEgIIBhIAEgIIBhICCAUSAigDEgIIBhIAEgIIBhICKAISAggDEgIoBg_0'}, // short walk
  {n:'', c:'CA0SAigMEggIBBoECAIQABIAEgwICSIICAISBAEBAQASAigFEgwICSIICAISBAEBAQASAigDEgIIChICKBMSDAgJIggIAhIEAAEBARICKAUSDAgJIggIAhIEAAEBARIAEgIIAxICKAw_0'}, //gallery

];

  PUZZLES.forEach(function(puzzle) {
    if (Math.seedrandom) {
      Math.seedrandom(puzzle.name);
      if (!puzzle.code) {
        var n = new Number(Math.round(Math.random() * 100000000));
        var code = n.toString(26+10)
          .substring(0, 4)
          .replace(/l/g, '1')
          .replace(/o/g, '0')
          .replace(/s/g, '5');
        puzzle.code = code;
      }
    }
  })


  function startLevel() {
    var gui;
    var grid = new windmill.Grid();
    var puzzle = PUZZLES[index];

    var theme = puzzle.theme || 'default';
    document.body.setAttribute('data-theme', theme);
    grid.initialize(undefined, undefined, puzzle.c);
    var uiHook = new windmill.GridUiHook();
    function onSuccess(path) {
      // alert('success'); console.log(arguments);
      gui.disappearSnake(200, [], 0);
      gui.dispose();
      index++;
      if (PUZZLES[index]) {
        startLevel(PUZZLES[index].c);
      } else {
        alert('You won a coupon for a free beer! Leave a note with a phone number by the door to redeem!');
      }
    }
    // uiHook.showToast = function() { alert('toast'); console.log(arguments); };
    uiHook.onSuccess = onSuccess;
    gui = new windmill.GridUi(grid, uiHook);
    gui.render();
    // Change this to PUZZLES[index].n for development
    window.location.hash = PUZZLES[index].n;

    windmill.Sound.playStartRipples();
  }

  function findPuzzle(puzzleName) {
    var foundIndex = 0;
    if (!puzzleName) { return foundIndex; }
    for (var i=0; i<PUZZLES.length; i++) {
      if (puzzleName === PUZZLES[i].n || puzzleName === PUZZLES[i].code) {
        foundIndex = i;
        break;
      }
    }
    return foundIndex;
  }

  index = findPuzzle(window.location.hash.replace('#', ''));
  startLevel();

});

import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MatDialogRef } from '@angular/material/dialog';
declare var $: any;


@Component({
  selector: 'app-sign-canvas',
  templateUrl: './sign-canvas.component.html',
  styleUrls: ['./sign-canvas.component.scss']
})
export class SignCanvasComponent implements OnInit {
  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;

  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 500
  };

  imgData;
  parentWidth;
  canvas;
  testdata: any;
  constructor(public dialogRef: MatDialogRef<any>) {

    // this.signaturePad = new SignaturePad(canvas);
  }



  ngOnInit() {
    this.canvas = document.querySelector("canvas");
    // this.parentWidth = $(this.canvas).parent().outerWidth();

    // this.canvas.setAttribute("width", this.parentWidth);

    // var ratio = Math.max(window.devicePixelRatio || 1, 1);
    // this.canvas.width = this.canvas.offsetWidth * ratio;
    // this.canvas.height = this.canvas.offsetHeight * ratio;
    // this.canvas.getContext("2d").scale(ratio, ratio);
    // this.signaturePad = new SignaturePad(this.canvas);

    console.log("this.canvasthis.canvasthis.canvas", this.canvas)
    console.log("this.parentWidththis.parentWidththis.parentWidth", this.parentWidth)
  }


  ngAfterViewInit() {
    // this.signaturePad is now available
    // var wrapper = document.getElementById("mainDiv");
    // console.log("CANVAS!!!!!!!!!!!!!!!", wrapper)
    // this.canvas = wrapper.querySelector("signature-pad");
    // this.parentWidth = $(this.canvas).parent().outerWidth();
    // console.log("***********************", this.canvas, this.parentWidth)
    // this.canvas.setAttribute("width", this.parentWidth);
    // this.signaturePad = new SignaturePad(this.canvas);
    // this.signaturePad.set('width', this.parentWidth); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.imgData = this.signaturePad.toDataURL('image/png')
    this.trimCanvas(this.canvas)
    // console.log(this.signaturePad.toDataURL());
  }


  clear() {

    console.log('Clear Calling');

    this.imgData = null
    this.signaturePad.clear();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  trimCanvas(c) {
    var ctx = c.getContext('2d'),
      copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, c.width, c.height),
      l = pixels.data.length,
      i,
      bound = {
        top: null,
        left: null,
        right: null,
        bottom: null
      },
      x, y;

    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
        x = (i / 4) % c.width;
        y = ~~((i / 4) / c.width);

        if (bound.top === null) {
          bound.top = y;
        }

        if (bound.left === null) {
          bound.left = x;
        } else if (x < bound.left) {
          bound.left = x;
        }

        if (bound.right === null) {
          bound.right = x;
        } else if (bound.right < x) {
          bound.right = x;
        }

        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }

    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    console.log("trimmed", trimmed)
    //  this.testdata = trimmed.data
    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    console.log('copy.canvas;', copy.canvas.toDataURL())
    console.log(" copy.putImageData(trimmed, 0, 0);", copy.putImageData(trimmed, 0, 0))
    this.testdata = copy.canvas.toDataURL()
    return copy.canvas;
  }

  submit() {
    this.dialogRef.close(this.testdata)
    // if(this.signaturePad.isEmpty()){
    //   alert("IS EMPTY")
    // }
    // else{
    //   this.dialogRef.close(this.testdata)
    // }
  }
}

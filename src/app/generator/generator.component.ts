import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ColorChromeModule, FormsModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  @ViewChild('memeCanvas', { static: false })
  myCanvas!: ElementRef<HTMLCanvasElement>;
  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  textColor: string = '#000000';
  bgColor: string = 'F9F9FB';

  preview(e: any) {
    this.fileEvent = e;
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = function (event) {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = function () {
        ctx?.drawImage(img, 0, 100, 600, 400);
      };
    };
  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas?.getContext('2d');

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    ctx!.fillStyle = this.bgColor;
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    this.preview(this.fileEvent);

    ctx!.fillStyle = this.textColor;
    ctx!.font = '50px Arial';
    ctx!.textAlign = 'center';
    ctx?.fillText(this.topText, canvas.width / 2, 70);
    ctx?.fillText(this.bottomText, canvas.width / 2, 550);
  }

  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBackgroundColor($event: ColorEvent) {
    this.bgColor = $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;

    let image = canvas.toDataURL('image/png');

    let link = document.createElement('a');
    link.download = 'memeImg.png';

    link.href = image;
    link.click();
  }
}

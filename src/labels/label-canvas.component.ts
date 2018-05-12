import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService} from './beer.service';
import { Beer } from './beer';


@Component({
  selector: 'label-canvas',
  templateUrl: './label-canvas.component.html',
  styleUrls: ['./label-canvas.component.css']
})

export class LabelCanvasComponent implements OnInit {

  @Input() beer: Beer; // propriété d'entrée du composant
  // @ViewChild('canvasImg') canvasImg: ElementRef; //pour récupérer l'élément SVG
  @ViewChild('dlImg') dlImg: ElementRef; //pour récupérer l'élément SVG
  types: Array<string>;
  backgroundFill: string;
  rectFill: string;
  circleFill: string;
  titleFill: string;
  textFill: string;
  link: string;
  seed: string = "";
  canvasImg: any;

  constructor(
    private beerService: BeerService,
    private router: Router) { }

  ngOnInit() {
    // Initialisation de la propriété types
    this.canvasImg = <HTMLCanvasElement>document.createElement('canvas');
    this.canvasImg.width = 3189;
    this.canvasImg.height = 1890;
    this.types = this.beerService.getBeerTypes();

  }

  reDraw() {
    let ctx: CanvasRenderingContext2D = this.canvasImg.getContext('2d');
    ctx.clearRect(0,0,3189,1890);

    //Fond
    ctx.fillStyle=this.backgroundFill;
    ctx.fillRect(0,0,3189,1890);

    //Losange
    ctx.fillStyle=this.rectFill;
    ctx.beginPath();
    ctx.moveTo(1594.5,0);
    ctx.lineTo(2539.5,945);
    ctx.lineTo(1594.5,1890);
    ctx.lineTo(649.5,945);
    ctx.lineTo(1594.5,0);
    ctx.closePath();
    ctx.fill();


    //Cercle
    ctx.fillStyle=this.circleFill ;
    ctx.beginPath();
    ctx.arc(1594.5, 945, 180, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    //Titre
    ctx.fillStyle=this.titleFill;
    ctx.font = "150pt AmaticSC";
    ctx.textAlign = "center";
    ctx.fillText(this.beer.name,1594.5,1400);
    console.log("text :"+this.beer.name);

    //Sous-titre
    ctx.fillStyle=this.titleFill;
    ctx.font = "70pt AmaticSC";
    ctx.textAlign = "center";
    ctx.fillText(this.beer.types.toString(),1594.5,1500);
    console.log("type :"+this.beer.types.toString());

    //Sous-titre
    ctx.fillStyle=this.titleFill;
    ctx.font = "80pt AmaticSC";
    ctx.textAlign = "center";
    ctx.fillText(this.beer.alcool+"%",1594.5,1780);
    console.log("degré :"+this.beer.alcool+"%");



    //image doit être 254,5x254,5
    let icon = new Image();
    icon.src = this.beer.picture;
    ctx.drawImage(icon,1467.5,818);
    ctx.save();

    //Ingrédients
    ctx.fillStyle=this.rectFill;
    ctx.font = "italic 40pt Oswald";
    ctx.textAlign = "left";
    let lines = this.beer.text.split('\n');
    for(let i=0;i<lines.length;i++)
    {
      ctx.translate( this.canvasImg.width - ((lines.length-(i+1))*60)-10, 1870 );
      ctx.rotate(3*Math.PI/2);
      ctx.fillText(lines[i],0,0);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    console.log("texte :"+this.beer.text);
    ctx.restore();

    let dataURL = this.canvasImg.toDataURL();
    this.dlImg.nativeElement.src=dataURL;
  }

  reRoll(){
    this.backgroundFill=this.beerService.randomizeBackgroundColor(this.beer);
    this.rectFill=this.beerService.randomizeRectColor(this.beer);
    this.circleFill=this.beerService.randomizeCircleColor(this.beer);
    this.titleFill=this.beerService.randomizeTitleColor(this.beer);
    let strArray = [this.backgroundFill,this.rectFill,this.circleFill,this.titleFill];
    this.seed=this.beerService.setBeerSeed(this.beer,strArray);
  }

  private rawToCssStyle(str: string): string{
    let sub = str.split(',');
    return "hsl("+sub[0]+","+sub[1]+"%,"+sub[1]+"%)";
  }

  private seedToColor(malt: string){
    console.log("init seed to color");
    let colors = atob(malt);
    let allHsl = colors.split(';');
    // let result;
    // for(let i=0; i<allHsl.length; i++)
    // {
    //   let sub = allHsl[i].split(',');
    //   result[i]="hsl("+sub[0]+","+sub[1]+"%,"+sub[1]+"%)";
    // }
    this.backgroundFill=allHsl[0];
    this.rectFill=allHsl[1];
    this.circleFill=allHsl[2];
    this.titleFill=allHsl[3];
  }

  ngAfterViewInit() {
      console.log(this.canvasImg.nativeElement);

      if(this.beer.seed=="")
        this.reRoll();
      else
        this.seedToColor(this.beer.seed);
      this.reDraw();
      console.log("background : "+this.backgroundFill);
      console.log("rect : "+this.rectFill);
      console.log("circle : "+this.circleFill);
      console.log("title : "+this.titleFill);
      // this.link = new XMLSerializer().serializeToString(this.svgImg.nativeElement);
      // let xml = new XMLSerializer().serializeToString(this.svgImg.nativeElement);
      this.updateLink();
    }

  updateLink() {
    this.link = this.dlImg.nativeElement.src;
  }

}

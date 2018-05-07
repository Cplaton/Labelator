import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService} from './beer.service';
import { Beer } from './beer';

@Component({
  selector: 'label-canvas',
  templateUrl: 'app/labels/label-canvas.component.html'
  // styleUrls: ['app/labels/label-svg.component.css']
})

export class LabelCanvasComponent implements OnInit {

  @Input() beer: Beer; // propriété d'entrée du composant
  @ViewChild('canvasImg') svgImg: ElementRef; //pour récupérer l'élément SVG
  types: Array<string>;
  backgroundFill: string;
  rectFill: string;
  circleFill: string;
  titleFill: string;
  textFill: string;
  link: string;
  seed: string = "";

  constructor(
    private beerService: BeerService,
    private router: Router) { }

  ngOnInit() {
    // Initialisation de la propriété types
    this.types = this.beerService.getBeerTypes();
    if(this.beer.seed=="")
      this.reRoll();
    else
      this.seedToColor(this.beer.seed);
    console.log("background : "+this.backgroundFill);
    console.log("rect : "+this.rectFill);
    console.log("circle : "+this.circleFill);
    console.log("title : "+this.titleFill);
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
      console.log(this.svgImg.nativeElement);
      // this.link = new XMLSerializer().serializeToString(this.svgImg.nativeElement);
      // let xml = new XMLSerializer().serializeToString(this.svgImg.nativeElement);
      this.updateLink();
    }

  updateLink() {
    this.link = 'data:image/svg+xml;base64,' + btoa(this.svgImg.nativeElement.outerHTML);
  }

}

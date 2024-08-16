import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

@Component({
  selector: 'ftapp-tree-area',
  templateUrl: './tree-area.component.html',
  styleUrls: ['./tree-area.component.scss']
})
export class TreeAreaComponent implements AfterViewInit, OnChanges {

  @Input() birthEvents: { name: string, birthyear: number }[] = [];
  @Input() treeData: any;


  private svg!: Selection<SVGSVGElement, unknown, HTMLElement, any>; 

  constructor() { }

  ngAfterViewInit(): void {
    this.createSvg();
    console.log("treedata",this.treeData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("ngonchanges");
    if (changes['birthEvents'] && !changes['birthEvents'].firstChange) {
      this.updateBirthEvents();
    }
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr('width', 600)
      .attr('height', 400);
    console.log('SVG created:', this.svg);
  }

  private updateBirthEvents(): void {
    const data = this.birthEvents;

    // Clear previous circles
    this.svg.selectAll('circle').remove();

    // Draw new circles
    const circles = this.svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 50 + 25)
      .attr('cy', 200)
      .attr('r', 0)
      .attr('fill', 'green');

    // Animate the circle growth
    circles.transition()
      .duration(500)
      .attr('r', 20);

    console.log('Birth events drawn:', data);
  }
}

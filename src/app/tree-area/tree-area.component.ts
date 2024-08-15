import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

export interface BirthEvent {
  name: string;
  birthyear: number;
  xOffset: number;
  id_person: number;
  id_partner?: number;
  id_father?: number; // Optional unique identifier for the father
  id_mother?: number; // Optional unique identifier for the mother
}

@Component({
  selector: 'ftapp-tree-area',
  templateUrl: './tree-area.component.html',
  styleUrls: ['./tree-area.component.scss']
})
export class TreeAreaComponent implements AfterViewInit, OnChanges {

  @Input() birthEvents: BirthEvent[] = [];  // Use the BirthEvent interface here

  private svg!: Selection<SVGSVGElement, unknown, HTMLElement, any>; 

  constructor() { }

  ngAfterViewInit(): void {
    this.createSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['birthEvents'] && !changes['birthEvents'].firstChange) {
      this.updateBirthEvents();
    }
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr('width', 600)
      .attr('height', 400);
  }

  private updateBirthEvents(): void {
    const data = this.birthEvents;
    const width = 80; // Width of the rectangle
    const height = 60; // Height of the rectangle
    const parentY = 50; // Vertical position for parents
    const childY = 150; // Vertical position for children
    const yOffset = 30; // Vertical offset for parent-child lines
    const xSpacing = 100; // Horizontal spacing between rectangles
  
    // Clear previous elements
    this.svg.selectAll('*').remove();
  
    // Create a map to store y positions and x offsets
    const yPositions: { [id: number]: number } = {};
    const xOffsets: { [generation: number]: number } = {};
  
    // Determine y positions and x offsets based on generations
    data.forEach(person => {
      if (person.id_father || person.id_mother) {
        // Person is a child
        yPositions[person.id_person] = childY;
      } else {
        // Person is a parent
        yPositions[person.id_person] = parentY;
      }
    });
  
    // Initialize xOffset mapping for each generation
    data.forEach(person => {
      if (!xOffsets[yPositions[person.id_person]]) {
        xOffsets[yPositions[person.id_person]] = 0;
      }
    });
  
    // Draw rectangles and manage x offsets
    this.svg.selectAll<SVGRectElement, BirthEvent>('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => {
        // Determine x position and update x offset for the generation
        const generationY = yPositions[d.id_person];
        const xOffset = xOffsets[generationY];
        xOffsets[generationY] += xSpacing; // Increment x offset for next person
        return xOffset + 10;
      })
      .attr('y', d => yPositions[d.id_person])
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'lightblue')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .attr('opacity', 1);
  
    // Add text elements for names
    this.svg.selectAll<SVGTextElement, BirthEvent>('text.name')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'name')
      .attr('x', d => {
        // Center text horizontally within the rectangle
        const x = d.xOffset + 10 + width / 2;
        return x;
      })
      .attr('y', d => yPositions[d.id_person] + height / 2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'black')
      .style('font-size', '10px')
      .attr('opacity', 0)
      .text(d => `${d.name}`)
      .transition()
      .duration(500)
      .attr('opacity', 1);
  
    // Add text elements for years
    this.svg.selectAll<SVGTextElement, BirthEvent>('text.year')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'year')
      .attr('x', d => {
        // Center text horizontally within the rectangle
        const x = d.xOffset + 10 + width / 2;
        return x;
      })
      .attr('y', d => yPositions[d.id_person] + height + 15)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'black')
      .style('font-size', '8px')
      .attr('opacity', 0)
      .text(d => `${d.birthyear}`)
      .transition()
      .duration(500)
      .attr('opacity', 1);
  
    // Draw lines for married couples
    this.svg.selectAll<SVGLineElement, any>('line.married').remove(); // Clear previous lines
  
    data.forEach(person => {
      if (person.id_partner) {
        const partner = data.find(p => p.id_person === person.id_partner);
        if (partner) {
          const startX = this.svg.select(`rect:nth-child(${data.indexOf(person) + 1})`).attr('x') as unknown as number;
          const endX = this.svg.select(`rect:nth-child(${data.indexOf(partner) + 1})`).attr('x') as unknown as number;
          const startY = yPositions[person.id_person] + height / 2;
          const endY = yPositions[partner.id_person] + height / 2;
  
          this.svg.append('line')
            .attr('class', 'married')
            .attr('x1', +startX + width / 2)
            .attr('y1', startY)
            .attr('x2', +endX + width / 2)
            .attr('y2', endY)
            .attr('stroke', 'black')
            .attr('stroke-width', 2);
        }
      }
    });
  
    // Draw lines for parent-child relationships
    data.forEach(child => {
      if (child.id_father) {
        const father = data.find(p => p.id_person === child.id_father);
        if (father) {
          const childX = this.svg.select(`rect:nth-child(${data.indexOf(child) + 1})`).attr('x') as unknown as number;
          const fatherX = this.svg.select(`rect:nth-child(${data.indexOf(father) + 1})`).attr('x') as unknown as number;
          const childY = yPositions[child.id_person] + height;
          const fatherY = yPositions[father.id_person] - yOffset;
  
          this.svg.append('line')
            .attr('class', 'parent-child')
            .attr('x1', +childX + width / 2)
            .attr('y1', childY)
            .attr('x2', +fatherX + width / 2)
            .attr('y2', fatherY)
            .attr('stroke', 'blue')
            .attr('stroke-width', 2);
        }
      }
  
      if (child.id_mother) {
        const mother = data.find(p => p.id_person === child.id_mother);
        if (mother) {
          const childX = this.svg.select(`rect:nth-child(${data.indexOf(child) + 1})`).attr('x') as unknown as number;
          const motherX = this.svg.select(`rect:nth-child(${data.indexOf(mother) + 1})`).attr('x') as unknown as number;
          const childY = yPositions[child.id_person] + height;
          const motherY = yPositions[mother.id_person] - yOffset;
  
          this.svg.append('line')
            .attr('class', 'parent-child')
            .attr('x1', +childX + width / 2)
            .attr('y1', childY)
            .attr('x2', +motherX + width / 2)
            .attr('y2', motherY)
            .attr('stroke', 'red')
            .attr('stroke-width', 2);
        }
      }
    });
  }
}

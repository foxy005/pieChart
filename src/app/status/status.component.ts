import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import {ApiServiceService} from './../api-service.service'


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  data;
  aaCount =0;
  ocCount=0;
  statusArray;

  constructor(private _apiService:ApiServiceService) { 

  }

  ngOnInit() {
  
    d3.json('http://localhost:3000/data').then((info)=>{
      this.data = info

          this.data.forEach(e => {
          // console.log(e)
          if(e.ApprovalStatus == 'Order Created'){
            this.ocCount+=1
          }else this.aaCount+=1
        });
        this.statusArray = [
          {name:'OC',count:Number(this.ocCount)},
          {name:'AA',count:Number(this.aaCount)}]
        console.log(this.statusArray)

          let colors = d3.scaleOrdinal(d3.schemeCategory10)
          let svg = d3.select('p')
                    .append('svg')
                    .attr('width',400)
                    .attr('height',400)
                    .style('background','grey')

          let piData = d3.pie().sort(null).value(function(d:any,i){
            return d.count
          })(this.statusArray)

          console.log(piData)

          var segments:any = d3.arc()
                            .innerRadius(0)
                            .outerRadius(150)
                            .padAngle(.5)
                            .padRadius(20)
                

         var sections = svg.append('g')
                            .attr('transform','translate(200,200)')
                            .selectAll('path')
                            .data(piData)
        sections.enter().append('path').attr("d",segments).attr('fill',(d:any)=>colors(d.data.count))

        var content = d3.select('g')
                        .selectAll('text')
                        .data(piData)
                        .enter()
                        .append('text')
                        .each(function(d:any){
                          let center = segments.centroid(d)
                          d3.select(this)
                            .attr('x',center[0])
                            .attr('y',center[1])
                            .text(d.data.name)
                            .attr('fill','white')
                        })
    })

  }

}

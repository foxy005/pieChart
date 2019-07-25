import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-approval-status',
  templateUrl: './approval-status.component.html',
  styleUrls: ['./approval-status.component.css']
})
export class ApprovalStatusComponent implements OnInit {

  jsonData;

  constructor() { }

  ngOnInit() {
    d3.json('http://localhost:3000/data').then(info=>{
      this.jsonData=info
      // console.log(info)
      let AAdata = this.jsonData.filter(e=>{
        return e.ApprovalStatus =='Awaiting Approval'
        
      })
      let data = AAdata.map(e=>{
        return e.ApproverName
      })
      // console.log(data)
      var count = {};
      data.forEach(element => {
        count[element] = (count[element] || 0)+1
      });
      // console.log(count)
      count = Object.entries(count)
      // console.log(count)
      const loc = count.map(([x,y])=>({x,y}))
      // console.log(loc)

      let colors = d3.scaleOrdinal(d3.schemeCategory10)

      let svg = d3.select('p')
                .append('svg')
                .attr('width',900)
                .attr('height',500)
                

      let pieData = d3.pie().sort(null).value((d,i)=>{
        return d.y
      })(loc)

      console.log(pieData)

      let segments = d3.arc()
                        .innerRadius(0)
                        .outerRadius(150)
                        .padAngle(.5)
                        .padRadius(10)

      let sections = svg.append('g')
                        .attr('transform','translate(200,200)')
                        .selectAll('path')
                        .data(pieData)

      sections.enter().append('path').attr('d',segments).attr('fill',(d)=>colors(d.index))

      var legends = svg.append('g').attr('transform','translate(500,300)')
                          .selectAll('.legends').data(pieData)
      
      var legend = legends.enter().append('g').classed('legends',true)
                        .attr('transform',(d,i)=>{
                          return `translate(0,-${(i+1)*25})`
                        })

      legend.append('rect')
            .attr('width',20)
            .attr('height',20)
            .attr('fill',(d)=>colors(d.index))
      legend.append('text').text((d)=>d.data.x).attr('fill',(d)=>colors(d.index))
                        .attr('x',40)
                        .attr('y',20)
            
      
    })

  }

}

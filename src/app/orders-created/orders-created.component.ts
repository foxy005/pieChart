import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-orders-created',
  templateUrl: './orders-created.component.html',
  styleUrls: ['./orders-created.component.css']
})
export class OrdersCreatedComponent implements OnInit {

  jsonData;

  constructor() { }

  ngOnInit() {

    d3.json('http://localhost:3000/data').then(info=>{
      this.jsonData = info
    // console.log(this.jsonData)
      let ocData = this.jsonData.filter(e=>{
        return e.ApprovalStatus =="Order Created"
      })
      // console.log(ocData)

      let data = ocData.map(e=>{
        return e.ApproverName
      })

      // console.log(data)

      var count = {};
      data.forEach(element => {
        count[element] = (count[element] || 0)+1
      });

      // console.log(count)
      let countArray = Object.entries(count)
      console.log(countArray)
      const loc :any= countArray.map(([x,y])=>({x,y}))

      // count = Object.entries(count).map(([x,y])=>({x,y}))
      // console.log(count)
      // const loc = count.map(([x,y])=>({x,y}))
      // console.log(loc)

      let colors = d3.scaleOrdinal(d3.schemeDark2)

      let svg = d3.select('p')
                .append('svg')
                .attr('width',750)
                .attr('height',500)
                
                

      let pieData = d3.pie().sort(null).value((d:any,i)=>{
        return d.y
      })(loc)

      console.log(pieData)

      let segments:any = d3.arc()
                        .innerRadius(0)
                        .outerRadius(150)
                        .padAngle(.5)
                        .padRadius(10)

      let sections = svg.append('g')
                        .attr('transform','translate(200,200)')
                        .selectAll('path')
                        .data(pieData)

      sections.enter().append('path').attr('d',segments).attr('fill',(d:any)=>colors(d.index))

      var content = d3.select('g')
                        .selectAll('text')
                        .data(pieData)
                        .enter()
                        .append('text')
                        .each(function(d:any){
                          let center = segments.centroid(d)
                          d3.select(this)
                            .attr('x',center[0])
                            .attr('y',center[1])
                            .text(d.data.y)
                            
                        })


      var legends = svg.append('g').attr('transform','translate(500,300)')
                          .selectAll('.legends').data(pieData)
      
      var legend = legends.enter().append('g').classed('legends',true)
                        .attr('transform',(d,i)=>{
                          return `translate(0,-${(i+1)*30})`
                        })

      legend.append('rect')
            .attr('width',20)
            .attr('height',20)
            .attr('fill',(d:any)=>colors(d.index))
      legend.append('text').text((d:any)=>d.data.x).attr('fill',(d:any)=>colors(d.index))
                        .attr('x',30)
                        .attr('y',20)
            
    })
  }

}

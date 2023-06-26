import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import "./index.css";

am4core.addLicense("ch-custom-attribution");

const RegionMap = ({}) => {
  const loadChart = () => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("region-map", am4maps.MapChart);

    let interfaceColors = new am4core.InterfaceColorSet();

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Export

    // Data for general and map use
    let originCities = [
      {
        id: "virginia",
        title: "Virginia",
        name: "Mongo-DS-2",
        destinations: ["newyork", "california", "texas", "china"],
        latitude: 36.86314,
        longitude: -76.015778,
        scale: 1.5,
        zoomLevel: 1.74,
        zoomLongitude: 0.1341,
        zoomLatitude: 29.1712,
        color: "#000",
      },
    ];

    let destinationCities = [
      {
        id: "newyork",
        title: "Newyork",
        latitude: 50.73061,
        longitude: -73.935242,
        color: "#000",
        name: "lab-user-34",
        radius: 7,
        scale: 0.7,
      },
      {
        id: "california",
        title: "California",
        latitude: 36.778259,
        longitude: -119.417931,
        color: "#000",
        name: "cd-user-38",
        radius: 7,
        scale: 0.7,
      },
      {
        id: "texas",
        title: "Texas",
        latitude: 31.0,
        longitude: -100.0,
        color: "#000",
        name: "EC2-2",
        radius: 7,
        scale: 0.7,
      },
      {
        id: "china",
        title: "China",
        latitude: 22.316668,
        longitude: 114.183334,
        color: "#c83a39",
        name: "EC2-1",
        radius: 12,
        scale: 1.2,
      },
    ];

    // Default to London view
    //chart.homeGeoPoint = { "longitude": originCities[0].zoomLongitude, "latitude": originCities[0].zoomLatitude };

    //chart.homeZoomLevel = originCities[0].zoomLevel;

    let sourceSVG =
      "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

    let targetSVG =
      "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

    chart.zoomControl = new am4maps.ZoomControl();
    // Texts
    let labelsContainer = chart.createChild(am4core.Container);
    labelsContainer.isMeasured = false;
    labelsContainer.x = 80;
    labelsContainer.y = 27;
    labelsContainer.layout = "horizontal";
    labelsContainer.zIndex = 10;

    // let plane = labelsContainer.createChild(am4core.Sprite);
    // plane.scale = 0.15;
    // plane.path = planeSVG;
    // plane.fill = am4core.color("#cc0000");

    // let title = labelsContainer.createChild(am4core.Label);
    // title.text = "Flights from London";
    // title.fill = am4core.color("#cc0000");
    // title.fontSize = 20;
    // title.valign = "middle";
    // title.dy = 2;
    // title.marginLeft = 15;

    // let changeLink = chart.createChild(am4core.TextLink);
    // changeLink.text = "Click to change origin city";
    // changeLink.isMeasured = false;

    // changeLink.events.on("hit", function () {
    //   if (currentOrigin == originImageSeries.dataItems.getIndex(0)) {
    //     showLines(originImageSeries.dataItems.getIndex(1));
    //   } else {
    //     showLines(originImageSeries.dataItems.getIndex(0));
    //   }
    // });

    // changeLink.x = 142;
    // changeLink.y = 72;
    // changeLink.fontSize = 13;

    // The world
    let worldPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldPolygonSeries.useGeodata = true;
    worldPolygonSeries.fillOpacity = 0.6;
    worldPolygonSeries.exclude = ["AQ"];

    // Origin series (big targets, London and Vilnius)
    let originImageSeries = chart.series.push(new am4maps.MapImageSeries());
    let originImageTemplate = originImageSeries.mapImages.template;

    originImageTemplate.propertyFields.latitude = "latitude";
    originImageTemplate.propertyFields.longitude = "longitude";
    originImageTemplate.propertyFields.id = "id";

    originImageTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    originImageTemplate.nonScaling = true;
    originImageTemplate.tooltipText = "{name}\n{title}";

    originImageTemplate.setStateOnChildren = true;
    originImageTemplate.states.create("hover");

    originImageTemplate.horizontalCenter = "middle";
    originImageTemplate.verticalCenter = "middle";

    let originHitCircle = originImageTemplate.createChild(am4core.Circle);
    originHitCircle.radius = 13;
    originHitCircle.fill = interfaceColors.getFor("background");

    let originTargetIcon = originImageTemplate.createChild(am4core.Sprite);
    originTargetIcon.fill = interfaceColors.getFor("alternativeBackground");
    originTargetIcon.strokeWidth = 0;
    originTargetIcon.scale = 1.5;
    originTargetIcon.horizontalCenter = "middle";
    originTargetIcon.verticalCenter = "middle";
    originTargetIcon.path = sourceSVG;
    originTargetIcon.propertyFields.fill = "color";

    let originHoverState = originTargetIcon.states.create("hover");
    originHoverState.properties.fill = chart.colors.getIndex(1);

    // when hit on city, change lines
    originImageTemplate.events.on("hit", function (event) {
      showLines(event.target.dataItem);
    });

    // destination series (small targets)
    let destinationImageSeries = chart.series.push(
      new am4maps.MapImageSeries()
    );
    let destinationImageTemplate = destinationImageSeries.mapImages.template;

    destinationImageTemplate.nonScaling = true;
    destinationImageTemplate.tooltipText = "{name}\n{title}";
    destinationImageTemplate.fill = interfaceColors.getFor(
      "alternativeBackground"
    );
    destinationImageTemplate.setStateOnChildren = true;
    destinationImageTemplate.states.create("hover");

    destinationImageTemplate.propertyFields.latitude = "latitude";
    destinationImageTemplate.propertyFields.longitude = "longitude";
    destinationImageTemplate.propertyFields.id = "id";
    destinationImageTemplate.propertyFields.fill = "color";

    let destinationHitCircle = destinationImageTemplate.createChild(
      am4core.Circle
    );
    destinationHitCircle.propertyFields.radius = "radius";
    destinationHitCircle.fillOpacity = 1;
    destinationHitCircle.fill = interfaceColors.getFor("background");

    let destinationTargetIcon = destinationImageTemplate.createChild(
      am4core.Sprite
    );
    destinationTargetIcon.propertyFields.scale = "scale";
    destinationTargetIcon.path = targetSVG;
    destinationTargetIcon.horizontalCenter = "middle";
    destinationTargetIcon.verticalCenter = "middle";

    originImageSeries.data = originCities;
    destinationImageSeries.data = destinationCities;

    // Line series
    let lineSeries = chart.series.push(new am4maps.MapSplineSeries());
    lineSeries.mapLines.template.strokeWidth = 2;
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";
    lineSeries.mapLines.template.propertyFields.fill = "color";
    lineSeries.mapLines.template.nonScalingStroke = true;

    chart.events.on("ready", function (ev) {
      showLines(originImageSeries.dataItems.getIndex(0));
    });

    let currentOrigin;

    function showLines(origin) {
      let dataContext = origin.dataContext;
      let destinations = dataContext.destinations;
      // clear old
      lineSeries.mapLines.clear();
      lineSeries.toBack();
      worldPolygonSeries.toBack();

      currentOrigin = origin;
      let line;

      console.log("origin.mapImage.id",origin.mapImage.id)
      if (destinations) {
        for (var i = 0; i < destinations.length; i++) {
          if(destinations[i] === 'china'){
            lineSeries.mapLines.template.line.stroke = am4core.color("#FF0000");
          }
          line = lineSeries.mapLines.create();
          line.imagesToConnect = [origin.mapImage.id, destinations[i]];
        
        }
      }
      line.id = "myline";
      line.setClassName();
      // title.text = "Flights from " + dataContext.title;

      chart.zoomToGeoPoint(
        {
          latitude: dataContext.zoomLatitude,
          longitude: dataContext.zoomLongitude,
        },
        dataContext.zoomLevel,
        true
      );
    }

    let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
  };

  useEffect(() => {
    loadChart();
  }, []);

  return (
    <>
      <div
        id="region-map"
        className="mt-4"
        style={{ height: "450px", width: "100%" }}
      ></div>
    </>
  );
};

export default RegionMap;

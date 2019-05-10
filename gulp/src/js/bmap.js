/**
 * Created by Administrator on 2018/12/29.
 */
// 百度地图API功能
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
}
let map = new BMap.Map('map');
let poi = new BMap.Point(116.307852, 40.057031);
map.centerAndZoom(poi, 16);//设置中心点坐标和地图级别
map.enableScrollWheelZoom(); //启用鼠标滚动对地图放大缩小
let line = null

//鼠标绘制完成回调方法   获取各个点的经纬度
let overlays = [];
let points = [];
let walkingpoints = []
let removeMarker = function (e, ee, marker) {
    let index = null
    for (let i = 0; i < points.length; i++) {
        if (marker.point.lat === points[i].lat && marker.point.lng === points[i].lng) {
            index = i;
            break
        }
    }
    if (index >= 0) {
        map.clearOverlays();
        points.splice(index, 1);
        let linePoints = []
        for (let j = 0; j < points.length; j++) {
            linePoints.push(new BMap.Point(points[j].lng, points[j].lat))
            let marker = new BMap.Marker(new BMap.Point(points[j].lng, points[j].lat)); // 创建点

            let markerMenu = new BMap.ContextMenu();
            marker.enableDragging();
            markerMenu.addItem(new BMap.MenuItem('删除', removeMarker.bind(marker)));
            marker.addContextMenu(markerMenu);
            marker.addEventListener('click', function () {
                console.log('click')

            })

            marker.addEventListener("dragstart", function () {
                console.log('dragStart id', points[j].id)
                moveId = points[j].id;
            });
            marker.addEventListener("dragend", function () {
                let p = marker.getPosition();
                console.log('dragend', p)
                moveMarker(marker)
            });


            map.addOverlay(marker);            //增加点

        }
        // renderWalkLine(points)
        line = new BMap.Polyline(linePoints);
        map.addOverlay(line);
    }

}
let moveId = null
let moveMarker = function (marker) {
    console.log('marker)', marker)
    map.clearOverlays();
    for (let j = 0; j < points.length; j++) {
        if (points[j].id === moveId) {
            console.log('找到', marker)

            points[j].lat = marker.point.lat;
            points[j].lng = marker.point.lng;
//                map.clearOverlays(line);
            break
        }
    }
    let linePoints = [];
    console.log('points', points)
    for (let i = 0; i < points.length; i++) {
        console.log('for')
        let id = points[i].id
        linePoints.push(new BMap.Point(points[i].lng, points[i].lat))

        let marker2 = new BMap.Marker(new BMap.Point(points[i].lng, points[i].lat)); // 创建点

        let markerMenu = new BMap.ContextMenu();
        marker2.enableDragging();
        markerMenu.addItem(new BMap.MenuItem('删除', removeMarker.bind(marker2)));
        marker2.addContextMenu(markerMenu);
        marker2.addEventListener('click', function () {
            console.log('click')

        })

        marker2.addEventListener("dragstart", function () {
            moveId = id;
        });
        marker2.addEventListener("dragend", function () {
            let p = marker2.getPosition();
            moveMarker(marker2)
        });


        map.addOverlay(marker2);            //增加点


    }
    line = new BMap.Polyline(linePoints);
    map.addOverlay(line);
    // renderWalkLine(points)

}

let renderWalkLine = function (points) {
    walkingpoints=[];
    let walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, autoViewport: false}});
    for(let i=0;i<points.length-1;i++){
        let startPoint=points[i];
        let nextPoint=points[i+1];

        walking.search(new BMap.Point(startPoint.lng, startPoint.lat), new BMap.Point(nextPoint.lng, nextPoint.lat));
        walking.setSearchCompleteCallback(function (rs) {
            var pts = rs.getPlan(0).getRoute(0).getPath()
            console.log('rs', rs.getPlan(0).getRoute(0).getPath())
            if (pts) {
                walkingpoints.concat(pts)
                walking.clearResults();


                var polyline = new BMap.Polyline(pts);
                map.addOverlay(polyline);
            }


        });
    }
}

let overlaycomplete = function (e, marker) {
    let markerMenu = new BMap.ContextMenu();
    marker.enableDragging();           // 不可拖拽
    markerMenu.addItem(new BMap.MenuItem('删除', removeMarker.bind(marker)));
    marker.addContextMenu(markerMenu);
    marker.addEventListener('click', function () {
        console.log('click')
    })
    let lastPoint = points[points.length - 1]
    console.log('lastPoint',lastPoint)
    if (lastPoint) {
        line = new BMap.Polyline([lastPoint, marker.point]);
        map.addOverlay(line);
    }
    let id = uuid()
    points.push({lng: marker.point.lng, lat: marker.point.lat, id: id})
    // if (points.length > 1) {
    //     let walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, autoViewport: false}});
    //     let prePoint = points[points.length - 2];
    //     walking.search(new BMap.Point(prePoint.lng, prePoint.lat), new BMap.Point(marker.point.lng, marker.point.lat));
    //     walking.setSearchCompleteCallback(function (rs) {
    //         var pts = rs.getPlan(0).getRoute(0).getPath()
    //         console.log('rs', rs.getPlan(0).getRoute(0).getPath())
    //         if (pts) {
    //             walkingpoints.concat(pts)
    //             walking.clearResults();
    //
    //
    //             var polyline = new BMap.Polyline(pts);
    //             map.addOverlay(polyline);
    //         }
    //
    //
    //     });
    // }


    marker.addEventListener("dragstart", function () {
        moveId = id;
    });
    marker.addEventListener("dragend", function () {
        let p = marker.getPosition();
        moveMarker(marker)
    });
};

//实例化鼠标绘制工具
console.log('BMAP_DRAWING_MARKER',BMAP_DRAWING_MARKER)
let drawingManager = new BMapLib.DrawingManager(map, {
    isOpen: true, //是否开启绘制模式
    enableDrawingTool: true, //是否显示工具栏
    drawingMode: BMAP_DRAWING_MARKER,//绘制模式  多边形
    drawingToolOptions: {
        anchor: 3, //位置
        offset: new BMap.Size(5, 5), //偏离值
        drawingModes: [
            BMAP_DRAWING_MARKER,
        ]
    },
});

//添加鼠标绘制工具监听事件，用于获取绘制结果
drawingManager.addEventListener('markercomplete', overlaycomplete);
drawingManager.enableCalculate()
function clearAll() {
    for (let i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
    }
    overlays.length = 0
}
function getAll() {
    console.log('points', points.length)
}
/*** 工具函数开始 ***/
//随机数生成
function rd(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
};
/*** 工具函数结束 ***/


//搭建舞台
var app = new PIXI.Application({
    width: 750,
    height: 1440,
    backgroundColor:0xffbd3e
});
$('#app').append(app.view);

//资源加载
app.loader
.add([
    {name:'zkkl',url:'./fonts/zkkl.ttf'},
    // {name:'p1_01',url:'./images/p1_01.png'},
    // {name:'p1_02',url:'./images/p1_02.png'},
    // {name:'p1_03',url:'./images/p1_03.png'},
    // {name:'p1_04',url:'./images/p1_04.png'},
    {name:'p2_01',url:'./images/p2_01.png'},
    {name:'p2_02',url:'./images/p2_02.png'},
    {name:'p2_03',url:'./images/p2_03.png'},
    {name:'p3_01',url:'./images/p3_01.png'},
    {name:'p3_02',url:'./images/p3_02.png'},
    {name:'p3_03',url:'./images/p3_03.png'},
    {name:'p3_04',url:'./images/p3_04.png'},
    {name:'p3_black_car',url:'./images/p3_black_car.png'},
    {name:'p3_red_car',url:'./images/p3_red_car.png'},
    {name:'p3_white_car',url:'./images/p3_white_car.png'},
    {name:'p3_yellow_car',url:'./images/p3_yellow_car.png'},
    {name:'p4_01',url:'./images/p4_01.png'},
    {name:'p4_02',url:'./images/p4_02.png'},
    {name:'p4_03',url:'./images/p4_03.png'},
    {name:'p4_barrier_1',url:'./images/p4_barrier_1.png'},
    {name:'p4_barrier_2',url:'./images/p4_barrier_2.png'},
    {name:'p4_barrier_3',url:'./images/p4_barrier_3.png'},
    {name:'p4_barrier_4',url:'./images/p4_barrier_4.png'},
    {name:'p4_black_car',url:'./images/p4_black_car.png'},
    {name:'p4_red_car',url:'./images/p4_red_car.png'},
    {name:'p4_white_car',url:'./images/p4_white_car.png'},
    {name:'p4_yellow_car',url:'./images/p4_yellow_car.png'},
    {name:'p4_lane',url:'./images/p4_lane.png'},
    {name:'p4_left_btn',url:'./images/p4_left_btn.png'},
    {name:'p4_right_btn',url:'./images/p4_right_btn.png'},
])
.load(setup)
.on('progress',(loader, res)=>{
    var progress = parseInt(loader.progress);
    // console.log(progress);
    //百分比加载
    p1_load_text.text = progress+'%';
    p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);
    //加载完成时显示开始游戏按钮
    if(progress>=100){
        p1_02.visible = true;
    }
});


var global={
    winWidth: $(window).width(), //屏幕宽
    winHeight: $(window).height(), //屏幕高
    activeColorCar: 1, //1：黄色汽车, 2：白色汽车, 3：红色汽车, 4：黑色汽车
    
    gamePlay: true,//控制游戏开启【true】还是关闭【false】
    gameLaneSpeed: 5,//赛道速度
    gameResScore:0,//总的得分分数
    gameBarrieMaxSpeed: 10,//障碍物最快速度
}

/**** p1页 start ****/
var p1 = new PIXI.Container();
p1.visible = false;
p1.width = 750;
p1.height = 1160;
p1.position.set(0, (app.view.height-p1._height)/2);

//标题
var p1_01 = new PIXI.Sprite.from('./images/p1_01.png');
p1_01.position.set((p1._width-473)/2, 0);
//加载文字
var p1_load_text = new PIXI.Text('0%',{
    fontFamily: 'zkkl',
    fontSize: 36,
    fill: 0xffffff
});
p1_load_text.position.set((app.view.width-p1_load_text.width)/2, 168);

//开始按钮
var p1_02 = new PIXI.Sprite.from('./images/p1_02.png');
p1_02.interactive = true;
p1_02.position.set((app.view.width-244)/2, p1._height-100);
p1_02.visible = false;
p1_02.on('tap', function(ev){
    p1.visible = false;
});

//赛道图
var p1_03 = new PIXI.Sprite.from('./images/p1_03.png');
p1_03.position.set(0, 220);

//赛道汽车图
var p1_04 = new PIXI.Sprite.from('./images/p1_04.png');
p1_04.position.set(0, 450);

//内容添加到页面中
p1.addChild(p1_01, p1_02, p1_03, p1_04, p1_load_text);
app.stage.addChild(p1);
/**** p1页 end ****/


//逻辑执行函数
function setup(loader, res){
    /**** p2页 start ****/
    var p2 = new PIXI.Container();
    p2.visible = false;
    p2.width = 750;
    p2.height = 1160;
    p2.position.set(0, (app.view.height-p2._height)/2);

    //规则标题
    var p2_01 = new PIXI.Sprite.from(res.p2_01.texture);
    p2_01.position.set((app.view.width-p2_01.width)/2, 30);

    //规则内容
    var p2_02 = new PIXI.Sprite.from(res.p2_02.texture);
    p2_02.position.set((app.view.width-p2_02.width)/2, 120);

    //【我知道了】按钮
    var p2_03 = new PIXI.Sprite.from(res.p2_03.texture);
    p2_03.interactive = true;
    p2_03.position.set((app.view.width-p2_03.width)/2, p2._height-100);
    p2_03.on('tap', function(){
        p2.visible = false;
    });
    
    //内容添加到页面中
    p2.addChild(p2_01, p2_02, p2_03);
    app.stage.addChild(p2);
    /**** p2页 end ****/


    /**** p3页 start ****/
    var p3 = new PIXI.Container();
    p3.visible = false;
    p3.width = 750;
    p3.height = 1160;
    p3.position.set(0, (app.view.height-p3._height)/2);

    //选择标题
    var p3_01 = new PIXI.Sprite.from(res.p3_01.texture);
    p3_01.position.set((app.view.width-p3_01.width)/2, 40);

    //汽车组
    var p3_car_group = new PIXI.Container();
    p3_car_group.width=p3_car_group.height=750;
    p3_car_group.position.set(0,(p3._height-p3_car_group._height)/2);

    //选择汽车标志
    var p3_02 = new PIXI.Sprite.from(res.p3_02.texture);
    var p302PositionArr=[
        {x:210,y:20},
        {x:495,y:20},
        {x:210,y:380},
        {x:495,y:380},
    ];
    p3_02.position.set(p302PositionArr[0].x, p302PositionArr[0].y);

    var p3CarPositionArr=[
        {x:155,y:82},
        {x:440,y:82},
        {x:155,y:440},
        {x:440,y:440},
    ];
    //黄色汽车
    var p3_yellow_car = new PIXI.Sprite.from(res.p3_yellow_car.texture);
    p3_yellow_car.position.set(p3CarPositionArr[0].x, p3CarPositionArr[0].y);
    p3_yellow_car.interactive = true;
    p3_yellow_car.on('tap', function(){
        console.log('黄色汽车');
        p3_02.position.set(p302PositionArr[0].x, p302PositionArr[0].y);
        global.activeColorCar = 1;
    }); 
    //白色汽车
    var p3_white_car = new PIXI.Sprite.from(res.p3_white_car.texture);
    p3_white_car.position.set(p3CarPositionArr[1].x, p3CarPositionArr[1].y);
    p3_white_car.interactive = true;
    p3_white_car.on('tap', function(){
        console.log('白色汽车');
        p3_02.position.set(p302PositionArr[1].x, p302PositionArr[1].y);
        global.activeColorCar = 2;
    }); 
    //红色汽车
    var p3_red_car = new PIXI.Sprite.from(res.p3_red_car.texture);
    p3_red_car.position.set(p3CarPositionArr[2].x, p3CarPositionArr[2].y);
    p3_red_car.interactive = true;
    p3_red_car.on('tap', function(){
        console.log('红色汽车');
        p3_02.position.set(p302PositionArr[2].x, p302PositionArr[2].y);
        global.activeColorCar = 3;
    }); 
    //黑色汽车
    var p3_black_car = new PIXI.Sprite.from(res.p3_black_car.texture);
    p3_black_car.position.set(p3CarPositionArr[3].x, p3CarPositionArr[3].y);
    p3_black_car.interactive = true;
    p3_black_car.on('tap', function(){
        console.log('黑色汽车');
        p3_02.position.set(p302PositionArr[3].x, p302PositionArr[3].y);
        global.activeColorCar = 4;
    }); 
    
    p3_car_group.addChild(p3_yellow_car, p3_white_car, p3_red_car, p3_black_car, p3_02);

    //【确定汽车】按钮
    var p3_04 = new PIXI.Sprite.from(res.p3_04.texture);
    p3_04.interactive = true;
    p3_04.position.set((app.view.width-p3_04.width)/2, p3._height-100);

    
    var randomLane=0;//随机车道
    //开始游戏的逻辑
    var startGame = function(){
        //选中的汽车在赛道上呈现：1：黄色汽车, 2：白色汽车, 3：红色汽车, 4：黑色汽车
        trackCar[`car${global.activeColorCar}`].visible = true;
        //使汽车走到随机的车道上，但不会走到应急车道中
        randomLane=rd(1,5);
        trackCar[`car${global.activeColorCar}`].x=p4CarInTrackArr[randomLane].x;
    }

    p3_04.on('tap', function(){
        p3.visible = false;
        p4.visible = true;
        startGame();
    });

    //内容添加到页面中
    p3.addChild(p3_01, p3_car_group, p3_04);
    app.stage.addChild(p3);
    /**** p3页 end ****/


    /**** p4页 start ****/
    var p4 = new PIXI.Container();
    // p4.visible = false;
    p4.width = 750;
    p4.height = global.winHeight;
    //顶部内容
    var p4TopGroup = new PIXI.Container();
    p4TopGroup.width = 750;
    p4TopGroup.height = 100;

    //背景
    var p4_01 = new PIXI.Sprite.from(res.p4_01.texture);

    //血条
    var p4_t_blood_text = new PIXI.Text('生命值',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4_t_blood_text.position.set(30, 33);
    var p4BloodGroup = new PIXI.Container();
    p4BloodGroup.position.set(137, 33);
    var p4_t_blood_b = new PIXI.Sprite(res.p4_03.texture);
    p4_t_blood_b.position.set(0, 0);
    var p4_t_blood_t = new PIXI.Sprite(res.p4_02.texture);
    p4_t_blood_t.position.set(0, 0);
    p4BloodGroup.addChild(p4_t_blood_b, p4_t_blood_t);
    //总得分
    var p4TotalScoreText1 = new PIXI.Text('总得分: ',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4TotalScoreText1.position.set(275, 33);
    var p4TotalScoreText2 = new PIXI.Text('0',{
        fontFamily:'zkkl',
        fontSize: 30,
    });
    p4TotalScoreText2.position.set(275+p4TotalScoreText1.width, 33);

    //赛道、障碍物及汽车
    var p4LaneGroup = new PIXI.Container();
    p4LaneGroup.position.set(0, 100);
    //赛道
    var p4_lane1 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane1.position.set(0, 0);
    var p4_lane2 = new PIXI.Sprite.from(res.p4_lane.texture);
    p4_lane2.position.set(0, -1170);

    //障碍物在赛道中的位置数组
    var p4BarrieInTrackArr=[
        {x:150, y:-150},//第一条道
        {x:275, y:-150},//第二条道
        {x:400, y:-150},//第三条道
        {x:525, y:-150},//第四条道
    ];
    //赛道中的障碍物（包括金币）
    var trackBarrie={};
    trackBarrie['barrier1'] = new PIXI.Sprite(res.p4_barrier_1.texture);
    trackBarrie['barrier1'].position.set(150, -150);
    trackBarrie['barrier2'] = new PIXI.Sprite(res.p4_barrier_2.texture);
    trackBarrie['barrier2'].position.set(275, -150);
    trackBarrie['barrier3'] = new PIXI.Sprite(res.p4_barrier_3.texture);
    trackBarrie['barrier3'].position.set(400, -150);
    trackBarrie['barrier4'] = new PIXI.Sprite(res.p4_barrier_4.texture);
    trackBarrie['barrier4'].position.set(525, -150);
    
    //汽车在赛道中的位置数组
    var p4CarInTrackArr=[
        {x:15, y:980},//应急车道左道
        {x:145, y:980},//第一条道
        {x:275, y:980},//第二条道
        {x:400, y:980},//第三条道
        {x:520, y:980},//第四条道
        {x:645, y:980},//应急车道右道
    ];
    //赛道中的汽车
    var trackCar={};
    trackCar['car1'] = new PIXI.Sprite(res.p4_yellow_car.texture);
    trackCar['car1'].visible = false;
    trackCar['car1'].position.set(520, 980);

    trackCar['car2'] = new PIXI.Sprite(res.p4_white_car.texture);
    trackCar['car2'].visible = false;
    trackCar['car2'].position.set(400, 980);

    trackCar['car3'] = new PIXI.Sprite(res.p4_red_car.texture);
    trackCar['car3'].visible = false;
    trackCar['car3'].position.set(275, 980);

    trackCar['car4'] = new PIXI.Sprite(res.p4_black_car.texture);
    trackCar['car4'].visible = false;
    trackCar['car4'].position.set(145, 980);

    p4LaneGroup.addChild(p4_lane1, 
                        p4_lane2, 
                        trackBarrie['barrier1'], 
                        trackBarrie['barrier2'], 
                        trackBarrie['barrier3'], 
                        trackBarrie['barrier4'],
                        trackCar['car1'],
                        trackCar['car2'],
                        trackCar['car3'],
                        trackCar['car4']);

    //操作区
    var p4ToolGroup = new PIXI.Container();
    p4ToolGroup.width=750;
    p4ToolGroup.height=150;
    p4ToolGroup.position.set(0, app.view.height-p4ToolGroup._height);
    //背景
    var p4ToolBg = new PIXI.Graphics();
    p4ToolBg.beginFill(0xff9500);
    p4ToolBg.drawRect(0,0,750,150);
    p4ToolBg.endFill();
    //左右按钮
    var p4LeftBtn = new PIXI.Sprite.from(res.p4_left_btn.texture);
    p4LeftBtn.interactive = true;
    p4LeftBtn.position.set(22, 22);
    p4LeftBtn.on('tap', function(){
        console.log('向左');
        randomLane-=1;
        //不超出赛道
        if( randomLane<0 ){
            randomLane=0;
        }
        //汽车跑到了应急车道上了
        if( randomLane==0 ){
            isEmergencyLane=true;
        }else{
            isEmergencyLane=false;            
        }
        trackCar[`car${global.activeColorCar}`].x=p4CarInTrackArr[randomLane].x;
    });
    var p4RightBtn = new PIXI.Sprite.from(res.p4_right_btn.texture);
    p4RightBtn.interactive = true;
    p4RightBtn.on('tap', function(){
        console.log('向右');
        randomLane+=1;
        //不超出赛道
        if( randomLane>p4CarInTrackArr.length-1 ){
            randomLane=p4CarInTrackArr.length-1;
        }
        //汽车跑到了应急车道上了
        if( randomLane==p4CarInTrackArr.length-1 ){
            isEmergencyLane=true;
        }else{
            isEmergencyLane=false;            
        }
        trackCar[`car${global.activeColorCar}`].x=p4CarInTrackArr[randomLane].x;
    });
    p4RightBtn.position.set(488, 22);
    p4ToolGroup.addChild(p4ToolBg, p4LeftBtn, p4RightBtn);
    //添加到页面
    p4TopGroup.addChild(p4_01, p4_t_blood_text, p4BloodGroup, p4TotalScoreText1, p4TotalScoreText2);
    p4.addChild(p4TopGroup, p4LaneGroup, p4ToolGroup);

    //层排序
    p4TopGroup.zIndex = p4ToolGroup.zIndex = 2;
    p4LaneGroup.zIndex = 1;
    p4.sortableChildren = true;

    app.stage.addChild(p4);

    //游戏进度开关
    var gameScore=0;
    var isEmergencyLane=false;
    //四个道中的障碍物随机速度
    var barrieRdArr={
        rd1: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd2: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd3: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed),
        rd4: rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed)
    }
    
    app.ticker.add(()=>{
        if(global.gamePlay){

            //赛道动起来
            p4_lane1.y+=global.gameLaneSpeed;
            p4_lane2.y+=global.gameLaneSpeed;
            if(p4_lane1.y>=1170){
                p4_lane1.y=0;
            }
            if(p4_lane2.y>=0){
                p4_lane2.y=-1170;
            }

            //总的分数相加
            if(isEmergencyLane){
                gameScore-=1;
            }else{
                gameScore+=1;
            }
            if(gameScore<0){
                gameScore=0;
            }
            //得分显示
            p4TotalScoreText2.text=global.gameResScore=gameScore;

            //障碍物动起来
            trackBarrie['barrier1'].y+=barrieRdArr.rd1;
            trackBarrie['barrier2'].y+=barrieRdArr.rd2;
            trackBarrie['barrier3'].y+=barrieRdArr.rd3;
            trackBarrie['barrier4'].y+=barrieRdArr.rd4;
            //超出了赛道，那么从另外一条道中从新开始
            if(trackBarrie['barrier1'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier1'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd1 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier2'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier2'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd2 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier3'].y>=1300){
                var rdNum = rd(0,4);
                trackBarrie['barrier3'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd3 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }
            if(trackBarrie['barrier4'].y>=1200){
                var rdNum = rd(0,4);
                trackBarrie['barrier4'].position.set(p4BarrieInTrackArr[rdNum].x, p4BarrieInTrackArr[rdNum].y );
                barrieRdArr.rd4 = rd(global.gameLaneSpeed, global.gameBarrieMaxSpeed);
            }

        }
    });

    /**** p4页 end ****/
}

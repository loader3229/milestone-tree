
addLayer("t", {
    name: "transcend", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
	points: new Decimal(0),
	specialPoints: {
		11: new Decimal(0),
		12: new Decimal(0),
		21: new Decimal(0),
		22: new Decimal(0),
		31: new Decimal(0),
		32: new Decimal(0),
		41: new Decimal(0),
	},
	highestAPC: {
		0: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		11: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		12: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		21: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		22: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		31: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		32: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
		41: {
			11: 0,
			12: 0,
			21: 0,
			22: 0,
			31: 0,
			32: 0,
			41: 0,
		},
	}
    }},
    color: "#FFFF00",
    requires1(){
		if(player.m.points.gte(137))return new Decimal("1e640");
		return new Decimal("1e850");
	},
    requires(){
		if(player.t.activeChallenge)return new Decimal(Infinity);
		return tmp.t.requires1;
	},
    resource: "transcend points", // Name of prestige currency
    baseResource: "atomic-prestige points", // Name of resource prestige is based on
    baseAmount() {return player.ap.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for transcend points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.m.best.gte(99)},
	branches: ["ap"],
	softcap:new Decimal(Infinity),
	softcapPower:new Decimal(1),
	gainMult(){
		let mult=new Decimal(1);
		if(player.mm.points.gte(21))mult=mult.mul(2);
		if(player.mm.points.gte(22))mult=mult.mul(2);
		if(player.mm.points.gte(23))mult=mult.mul(2);
		if(player.mm.points.gte(24))mult=mult.mul(2);
		if(player.mm.points.gte(25))mult=mult.mul(tmp.mm.meta25Effect);
		if(hasUpgrade("pe",21))mult=mult.mul(upgradeEffect("pe",21));
		if(hasUpgrade("se",22))mult=mult.mul(upgradeEffect("se",22));
		if(hasUpgrade("t",63))mult=mult.mul(upgradeEffect("t",63));
		return mult;
	},
	getResetGain() {
		if(player.ap.points.lt(tmp.t.requires1))return new Decimal(0);
		let amt=Decimal.log10(player.ap.points).sub(600).div(250).pow(2).mul(tmp.t.gainMult);
		amt=amt.floor();
		//if(amt.gte(Decimal.sub(4e14,player.t.points)) && !player.t.activeChallenge){
		//	amt=Decimal.sub(4e14,player.t.points).ceil().max(0);
		//}
		return amt;
	},
	getNextAt() {
		if(player.ap.points.lt(tmp.t.requires1))return new Decimal(tmp.t.requires1);
		let amt=Decimal.log10(player.ap.points).sub(600).div(250).pow(2).mul(tmp.t.gainMult);
		amt=amt.floor().plus(1).div(tmp.t.gainMult);
		amt=Decimal.pow(10,amt.pow(1/2).mul(250).add(600));
		return amt;
	},
	getNextSPAt() {
		if(!player.t.activeChallenge)return new Decimal(0);
		let amt=player.t.specialPoints[player.t.activeChallenge].plus(1).div(tmp.t.gainMult);
		amt=Decimal.pow(10,amt.pow(1/2).mul(250).add(600));
		if(amt.lt(tmp.t.requires1))return new Decimal(tmp.t.requires1);
		return amt;
	},
	upgrades: {
        rows: 8,
		cols: 4,
		11: {
			title: "Transcend Upgrade 11",
            description: "Third Milestone's effect ^1.005",
            cost: new Decimal(1),
        },
		12: {
			title: "Transcend Upgrade 12",
            description: "Prestige Point gain ^1.005",
            cost: new Decimal(1),
        },
		13: {
			title: "Transcend Upgrade 13",
            description: "Super-Prestige Point gain ^1.005",
            cost: new Decimal(1),
        },
		14: {
			title: "Transcend Upgrade 14",
            description: "Hyper-Prestige Point gain ^1.005",
            cost: new Decimal(1),
        },
		21: {
			title: "Transcend Upgrade 21",
            description: "Prestige and Super-Prestige Upgrade 31 is boosted.",
            cost: new Decimal(5),
        },
		22: {
			title: "Transcend Upgrade 22",
            description: "Atomic-Prestige Point gain ^1.01",
            cost: new Decimal(10),
        },
		23: {
			title: "Transcend Upgrade 23",
            description: "Third Milestone's effect ^1.005",
            cost: new Decimal(15),
        },
		24: {
			title: "Transcend Upgrade 24",
            description: "Prestige Boost is cheaper",
            cost: new Decimal(20),
        },
		31: {
			title: "Transcend Upgrade 31",
            description: "Third Milestone's effect ^1.005",
            cost: new Decimal(50),
        },
		32: {
			title: "Transcend Upgrade 32",
            description: "Prestige Point gain ^1.005",
            cost: new Decimal(75),
        },
		33: {
			title: "Transcend Upgrade 33",
            description: "Super-Prestige Point gain ^1.005",
            cost: new Decimal(100),
        },
		34: {
			title: "Transcend Upgrade 34",
            description: "Hyper-Prestige Point gain ^1.005",
            cost: new Decimal(125),
        },
		41: {
			title: "Transcend Upgrade 41",
            description(){return "Hyper Boost cost /"+format("1e60000")},
            cost: new Decimal(300),
			unlocked(){return player.m.points.gte(104);}
        },
		42: {
			title: "Transcend Upgrade 42",
            description(){return "Gain an extra Hyper Boost."},
            cost: new Decimal(400),
			unlocked(){return player.m.points.gte(104);}
        },
		43: {
			title: "Transcend Upgrade 43",
            description(){return "Hyper Boost's effect is better."},
            cost: new Decimal(500),
			unlocked(){return player.m.points.gte(104);}
        },
		44: {
			title: "Transcend Upgrade 44",
            description(){return "Unlock a new row of Atomic-Prestige upgrades."},
            cost: new Decimal(600),
			unlocked(){return player.m.points.gte(104);}
        },
		51: {
			title: "Transcend Upgrade 51",
            description(){return "First HP buyable's effect ^2.1"},
            cost: new Decimal(30000),
			unlocked(){return player.m.points.gte(111);}
        },
		52: {
			title: "Transcend Upgrade 52",
            description(){return "Milestone cost scaling starts later based on your transcend points."},
            cost: new Decimal(60000),
			unlocked(){return player.m.points.gte(111);},
			effect(){
				let b = player.t.points.add(10).log10().sqrt().mul(1.2);
				if(player.t.points.add(10).log10().gte(625/36))b = player.t.points.add(10).log10().mul(0.288);
				if(hasUpgrade("t",81))b = player.t.points.add(10).log10().sqrt().mul(1.2).max(player.t.points.add(10).log10().mul(0.3)).add(0.65);
				return new Decimal(9).plus(b);
			},
            effectDisplay() { return "+"+format(this.effect(),4) },
        },
		53: {
			title: "Transcend Upgrade 53",
            description(){return "Reduce the 1st Milestone's softcap's potency."},
            cost: new Decimal(2e6),
			unlocked(){return player.m.points.gte(111);},
        },
		54: {
			title: "Transcend Upgrade 54",
            description(){return "1st Milestone's softcap starts later based on your transcend points."},
            cost: new Decimal(1e7),
			unlocked(){return player.m.points.gte(111);},
			effect(){
				let p=0.8;
				let m=0.05;
				if(player.m.points.gte(128)){
					p+=0.1;
				}
				let eff=player.t.points.add(10).log10().pow(p).mul(m);
				return new Decimal(1).plus(eff);
			},
            effectDisplay() { return format(this.effect(),4)+"x later" },
        },
		61: {
			title: "Transcend Upgrade 61",
            description(){return "All Dilation Effects +0.05"},
            cost: new Decimal(1e10),
			unlocked(){return player.m.points.gte(125);},
        },
		62: {
			title: "Transcend Upgrade 62",
            description(){return "Atomic-Prestige point gain is boosted based on your transcend points."},
            cost: new Decimal(1e11),
			unlocked(){return player.m.points.gte(125);},
			effect(){
				let base=80;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
			},
            effectDisplay() { return format(this.effect())+"x" },
        },
		63: {
			title: "Transcend Upgrade 63",
            description(){return "Transcend point gain is boosted based on your transcend points."},
            cost: new Decimal(1e12),
			unlocked(){return player.m.points.gte(125);},
			effect(){
				let base=1.05;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
			},
            effectDisplay() { return format(this.effect())+"x" },
        },
		64: {
			title: "Transcend Upgrade 64",
            description(){return "Hyper Boost cost /"+format("1e300000")},
            cost: new Decimal(4e12),
			unlocked(){return player.m.points.gte(125);}
        },
		71: {
			title: "Transcend Upgrade 71",
            description(){return "Hyper Boost cost /"+format("1e30000")},
            cost: new Decimal(1e13),
			unlocked(){return player.m.points.gte(136);}
        },
		72: {
			title: "Transcend Upgrade 72",
            description(){return "Meta-Milestones are cheaper based on Transcend Points."},
            cost: new Decimal(2e13),
			unlocked(){return player.m.points.gte(136);},
			effect(){
				let p=0.5;
				let m=0.01;
				if(hasUpgrade("t",74))m+=0.01;
				let eff=player.t.points.add(10).log10().pow(p).mul(m);
				return new Decimal(1).plus(eff);
			},
            effectDisplay() { return "/"+format(this.effect(),4) },
        },
		73: {
			title: "Transcend Upgrade 73",
            description(){return "1st Milestone's softcap starts later based on AP challenge completions."},
            cost: new Decimal(1e14),
			unlocked(){return player.m.points.gte(136);},
			effect(){
				let c=0;
				for(var i in player.ap.challenges)c+=player.ap.challenges[i];
				let p=2;
				if(hasUpgrade("t",74))p+=0.1;
				let m=1e-5;
				if(hasUpgrade("t",82))m*=1.5;
				let eff=new Decimal(c).pow(p).mul(m);
				return new Decimal(1).plus(eff);
			},
            effectDisplay() { return format(this.effect(),4)+"x later" },
        },
		74: {
			title: "Transcend Upgrade 74",
            description(){return "Transcend Upgrade 72 and 73 are boosted."},
            cost: new Decimal(4e14),
			unlocked(){return player.m.points.gte(136);},
        },
		81: {
			title: "Transcend Upgrade 81",
            description(){return "Transcend Upgrade 52 is boosted."},
            cost: new Decimal(5e17),
			unlocked(){return player.m.points.gte(153);},
        },
		82: {
			title: "Transcend Upgrade 82",
            description(){return "Transcend Upgrade 73 is better."},
            cost: new Decimal(3e19),
			unlocked(){return player.m.points.gte(153);},
        },
	},
	
	challenges: {
        rows: 4,
		cols: 2,
		11:{
                name: "Dilation",
                completionLimit: Infinity,
			    challengeDescription() {return "1st milestone's effect ^"+format(tmp.t.dilationEffect)+"<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return true },
                goal: function(){
					if(player.m.points.gte(110))return (player.t.challenges[11]+1)*(player.t.challenges[11]+1);
					return 2*Math.pow(3,player.t.challenges[11]);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "3rd milestone's effect is better." },
		},
		12:{
                name: "Softcapped",
                completionLimit: Infinity,
			    challengeDescription() {return "1st milestone's softcap starts earlier<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(104) },
                goal: function(){
					return (player.t.challenges[12]+1)*(player.t.challenges[12]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
				rewardEffect() {
		if(player.m.points.lt(112) && player.t.activeChallenge==12)return 1;
                    let ret = 1+player.t.challenges[12]*0.1;
                    return ret;
                },
				rewardDisplay() {
                    return format(this.rewardEffect())+"x later";
                },
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { 
				if(player.m.points.lt(112))return "1st milestone's softcap starts later, but the reward is disabled in this challenge.";
				else return "1st milestone's softcap starts later.";
		 },
		},
		21:{
                name: "Prestige Dilation",
                completionLimit: Infinity,
			    challengeDescription() {return "1st milestone's effect and prestige point gain ^"+format(tmp.t.dilationEffect)+"<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(109) },
                goal: function(){
					return (player.t.challenges[21]+1)*(player.t.challenges[21]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "3rd milestone's effect is better." },
		},
		22:{
                name: "Hardcapped",
                completionLimit: Infinity,
			    challengeDescription() {return "'Softcapped' is applied, and 1st milestone's softcap is its hardcap.<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(115) },
                goal: function(){
					return (player.t.challenges[22]+1)*(player.t.challenges[22]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
				rewardEffect() {
		            let ret = 1+player.t.challenges[22]*0.1;
                    return ret;
                },
				rewardDisplay() {
                    return format(this.rewardEffect())+"x later";
                },
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "1st milestone's softcap starts later." },
		},
		31:{
                name: "Super Dilation",
                completionLimit: Infinity,
			    challengeDescription() {return "1st milestone's effect, prestige point gain and super-prestige point gain ^"+format(tmp.t.dilationEffect)+"<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(125) },
                goal: function(){
					return (player.t.challenges[31]+1)*(player.t.challenges[31]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "3rd milestone's effect is better." },
		},
		32:{
                name: "Prestige Hardcapped",
                completionLimit: Infinity,
			    challengeDescription() {return "'Hardcapped' is applied, and prestige point gain is affected by 1st Milestone's softcap<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(137) },
                goal: function(){
					return (player.t.challenges[32]+1)*(player.t.challenges[32]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
				rewardEffect() {
		            let ret = 1+player.t.challenges[32]*0.1;
                    return ret;
                },
				rewardDisplay() {
                    return format(this.rewardEffect())+"x later";
                },
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "1st milestone's softcap starts later." },
		},
		41:{
                name: "Hyper Dilation",
                completionLimit: Infinity,
			    challengeDescription() {return "'Super Dilation' is applied, and hyper-prestige point gain ^"+format(tmp.t.dilationEffect)+"<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player.m.points.gte(158) },
                goal: function(){
					return (player.t.challenges[41]+1)*(player.t.challenges[41]+1);
				},
				canComplete(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					if(c>=tmp.t.challenges[this.id].goal)return true;
					return false;
				},
                currencyDisplayName: "AP challenge completions",
                rewardDescription() { return "3rd milestone's effect is better." },
		},
	},
	hardcap:new Decimal(1e20),
	passiveGeneration(){
		if(player.t.activeChallenge)return 0;
		if(player.m.points.gte(154))return 3;
		if(player.m.points.gte(151))return 2;
		if(player.m.points.gte(133))return 1;
		if(player.m.points.gte(130))return 0.8;
		if(player.m.points.gte(127))return 0.6;
		if(player.m.points.gte(123))return 0.45;
		if(player.m.points.gte(120))return 0.3;
		if(player.m.points.gte(119))return 0.2;
		if(player.m.points.gte(118))return 0.1;
		if(player.m.points.gte(117))return 0.05;
		if(player.m.points.gte(116))return 0.02;
		if(player.m.points.gte(115))return 0.01;
		if(player.m.points.gte(113))return 0.005;
		if(player.m.points.gte(110))return 0.002;
		return 0;
	},
	tabFormat: {
		"Main":{
			content:[
				"main-display","prestige-button","resource-display",
				["display-text",function(){return "Transcend point is hardcapped at "+format(layers.t.hardcap)}],
				"upgrades",
				["display-text",function(){return "AP challenge is applied after T challenge, softcap is applied after AP challenge"}],
				["display-text",function(){
					let c=0;
					for(var i in player.ap.challenges)c+=player.ap.challenges[i];
					return "AP challenge completions: "+format(c,4)
				}],
				"challenges"
			]
		},"Special Transcend Points":{
			content:[
				"main-display",
				["display-text",function(){return "Reach "+format(tmp.t.requires1)+" atomic-prestige points in a Transcend Challenge to gain Special Transcend Points!"}],
				function(){if(!player.t.activeChallenge)return ["display-text",""];return "resource-display"},
				["display-text",function(){if(!player.t.activeChallenge || player.t.specialPoints[player.t.activeChallenge].gte(1e6))return "";return "Next "+layers.t.getSpecialTPName(player.t.activeChallenge)+" at "+format(tmp.t.getNextSPAt)+" atomic-prestige points"}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[11])+" Dilated Transcend Points, 3rd Milestone's effect ^"+format(layers.t.getSpecialEffect(11),4)}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[12])+" Softcapped Transcend Points, 1st Milestone's softcap starts "+format(layers.t.getSpecialEffect(12),4)+"x later"}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[21])+" Prestige-Dilated Transcend Points, Prestige Point gain ^"+format(layers.t.getSpecialEffect(21),4)}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[22])+" Hardcapped Transcend Points, 1st Milestone's softcap starts "+format(layers.t.getSpecialEffect(22),4)+"x later"}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[31])+" Super-Dilated Transcend Points, Super-Prestige Point gain ^"+format(layers.t.getSpecialEffect(31),4)}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[32])+" Prestige-Hardcapped Transcend Points"}],
				["display-text",function(){return "You have "+format(player.t.specialPoints[41])+" Hyper-Dilated Transcend Points, Hyper-Prestige Point gain ^"+format(layers.t.getSpecialEffect(41),4)}],
			],
			unlocked(){return player.m.points.gte(130);}
		},
	},
	update(){
		if(player.t.points.gte(layers.t.hardcap))player.t.points=new Decimal(layers.t.hardcap);
		if(player.m.best.gte(130) && player.t.activeChallenge){
			if(player.t.specialPoints[player.t.activeChallenge].lt(layers.t.getResetGain())){
				player.t.specialPoints[player.t.activeChallenge]=layers.t.getResetGain();
			}
		}
		if(player.m.points.gte(140)&&player.t.activeChallenge){
			if(layers.t.challenges[player.t.activeChallenge].canComplete()){
				player.t.challenges[player.t.activeChallenge]++;
			}
		}
	},
	dilationEffect(){
		let eff=0.45;
		if(hasUpgrade("t",61))eff+=0.05;
		return eff;
	},
	getSpecialTPName(x){
		if(x==11)return "Dilated Transcend Point";
		if(x==12)return "Softcapped Transcend Point";
		if(x==21)return "Prestige-Dilated Transcend Point";
		if(x==22)return "Hardcapped Transcend Point";
		if(x==31)return "Super-Dilated Transcend Point";
		if(x==32)return "Prestige-Hardcapped Transcend Point";
		if(x==41)return "Hyper-Dilated Transcend Point";
	},
	getSpecialEffect(x){
		let effect=(player.t.specialPoints[x] ?? new Decimal(0)).add(1).log10().div(100).add(1);
		return effect;
	}
})
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');

module.exports.loop = function(){
    //apply logic to creep
    for(let name in Game.creeps){
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }
    
    //delete not used creeps data
    for(let name in Memory.creeps)
    {
        if(!Game.creeps[name])
        {
            delete Memory.creeps[name];
        }
    }
    
    //automate respawn of creeps
    var harvesters = _.filter(Game.creeps, (creep) =>creep.memory.role == 'harvester');
    if(harvesters.length < 2){
        let newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {memory:{role: 'harvester'}});
    }
    var upgraders = _.filter(Game.creeps, (creep) =>creep.memory.role == 'upgrader');
    if(upgraders.length < 1 && harvesters.length > 1){
        let newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory:{role: 'upgrader'}});
    }
    var builders = _.filter(Game.creeps, (creep) =>creep.memory.role == 'builder');
    if(builders.length < 1 && harvesters.length > 0){
        let newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory:{role: 'builder'}});
    }
}

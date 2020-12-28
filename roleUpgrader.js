var roleUpgrader = {
    run: function(creep){

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.upgrading = false;
            creep.say('harvest');
        }

        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0){
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }

        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle:{stroke: '#ffffff'}});
            }
        }
        else{
            /*
            let upgradePoints = creep.room.find(FIND_SOURCES);
            if(creep.harvest(upgradePoints[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(upgradePoints[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            */
            let spawnEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && 
                        structure.store.getCapacity(RESOURCE_ENERGY) > 200;
                }
            });

            if(spawnEnergy.length > 0){
                if(creep.withdraw(spawnEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawnEnergy[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}

module.exports = roleUpgrader;
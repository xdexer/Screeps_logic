var roleBuilder = {
    run: function(creep){
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building){
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else{
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
};

module.exports = roleBuilder;

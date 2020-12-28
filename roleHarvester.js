var roleHarvester = {
    run: function(creep){
        if(creep.store.getFreeCapacity() > 0){
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle:{stroke:'#ffaa00'}});
            }
        }
        else{
            let returnPoint = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(returnPoint.length > 0){
                if(creep.transfer(returnPoint[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(returnPoint[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
function newImage(url){
    let image = document.createElement('img')
    image.src = url
    document.body.append(image)
    return image
}

function move(element){
    element.style.position = 'fixed'
    
    function moveToCoordinates(left, bottom){
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function moveWithArrowKeys(left,bottom,callback){
        let direction = null
        let x = left
        let y = bottom
        
        element.style.left = x + 'px'
        element.style.bottom = y + 'px'

        function moveCharacter(){
            if (direction === 'north'){
                y++
            }
            if (direction === 'south'){
                y--
            }
            if (direction === 'east'){
                x++
            }
            if (direction === 'west'){
                x--
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        setInterval(moveCharacter, 1) 

        document.addEventListener('keydown', function(e){
            if(e.repeat) return;

            if(e.key === 'ArrowLeft'){
                direction = 'west'
            }else if(e.key === 'ArrowUp'){
                direction = 'north'
            }else if(e.key === 'ArrowRight'){
                direction = 'east'
            }else if(e.key === 'ArrowDown'){
                direction = 'south'
            }
            callback(direction)
        })

        //Rewrote the lift listener to make movement smoother when key presses overlapped
        document.addEventListener('keyup', function(e){
            if(e.key === 'ArrowLeft' && direction === 'west'){
                direction = null
            }else if(e.key === 'ArrowUp' && direction === 'north'){
                direction = null
            }else if(e.key === 'ArrowRight' && direction === 'east'){
                direction = null
            }else if(e.key === 'ArrowDown' && direction === 'south'){
                direction = null
            }
            callback(direction)
        })
    }
    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}

move(newImage('assets/tree.png')).to(200, 450)
move(newImage('assets/pillar.png')).to(350, 250)
move(newImage('assets/pine-tree.png')).to(450, 350)
move(newImage('assets/crate.png')).to(150, 350)
move(newImage('assets/well.png')).to(500, 575)


function newItem(url){
    let item = newImage(url)
    item.addEventListener('click', () => {
        item.remove()
        let inventoryItem = document.createElement('img')
        inventoryItem.src = url;
        inventory.append(inventoryItem)
    })
    return item
}

move(newItem('assets/sword.png')).to(500, 555)
move(newItem('assets/shield.png')).to(165, 335)
move(newItem('assets/staff.png')).to(600, 250)

function newInventory(){
    let inventory = document.createElement('div')
    inventory.style.width = '100%'
    inventory.style.height = '100px'
    inventory.style.display = 'flex'
    inventory.style.flexDirection = 'row'
    inventory.style.alignItems = 'center'
    inventory.style.justifyContent = 'space-evenly'
    inventory.style.border = '2px solid black'
    inventory.style.backgroundColor = 'brown'
    document.body.append(inventory)
    return inventory
}

const inventory = move(newInventory()).to(0,0)

const character = newImage('assets/green-character/static.gif')

function handleDirectionChange(direction){
    
    if(direction === 'west'){
        character.src = 'assets/green-character/west.gif'
    }
    if(direction === 'north'){
        character.src = 'assets/green-character/north.gif'
    }
    if(direction === 'east'){
        character.src = 'assets/green-character/east.gif'
    }
    if(direction === 'south'){
        character.src = 'assets/green-character/south.gif'
    }
    if(direction === null){
        character.src = 'assets/green-character/static.gif'
    }
}

move(character).withArrowKeys(100, 250, handleDirectionChange)
const users=[];

const addUser=({id,name,room})=>{
//id is socketid
name = name.trim().toLowerCase();
room = room.trim().toLowerCase();

const existinguser =users.find((user)=>{
    return user.id==id && user.room==room;
})
 if (!name || !room) return { error: "Username and room are required." };
if(existinguser){
    return {error:"User already exist"};
}

const user = {id,name,room}; // it means that {id=id,name=name,room=room}

users.push(user);
return {user};

}

const removeUser =(id)=>{
const index = users.find((user)=>{
    return user.id===id;
})
if(index!=-1){
    return users.splice(index,1)[0];
}

}

const getUser =(id)=>users.find((user)=>user.id ===id);

const getUsersInRoom =(room)=>{
return users.filter((user)=>{
    return user.room ==room;
})
}

module.exports ={addUser,removeUser,getUser,getUsersInRoom};

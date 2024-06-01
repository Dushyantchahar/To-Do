
<template>
  <div class="todo-background">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="pa-3 elevation-12">
            <v-card-title class="headline"><h2>To-Do List</h2></v-card-title>
            <v-card-text>
              <v-text-field  label="What needs to be done?" v-model="newTask"
                @keyup.enter="addTask" outlined dense class="mb-4"></v-text-field>
              <v-btn color="deep-purple accent-4" dark @click="addTask" class="mb-4">Add Task</v-btn>
              <v-divider></v-divider>
              <v-list>
                <v-list-item v-for="(task, index) in tasks" :key="index" class="my-2">
                  <v-list-item-content>
                    {{ task.task }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon color="blue" @click="startEditing(index)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="pink" @click="removeTask(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Dialog for Editing Task -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field label="Task" v-model="editedItem.task" @keyup.enter="saveEdit" autofocus></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="deep-purple accent-4" text @click="saveEdit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>

export default {
  data() {
    return {
      newTask: '',
      tasks: [],
      dialog: false,
      editedIndex: -1,
      editedItem: { task: '' },
      mydata:{}

    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$axios.get('/api/v1/tasks/');
        var data=response.data;
        // this.mydata=data;
        // console.log(data, "ssssssss");  
        this.tasks = data;
      } catch (error) {
        console.error('There was an error fetching the tasks:', error);
      }
    },
    async addTask() {
  if (this.newTask.trim()) {
    try {
      const taskData = { task: this.newTask.trim() }; 
      // const taskData = { text: this.newTask.trim() };
      const response = await this.$axios.post('/api/v1/tasks/', taskData);
      this.tasks.push(response.data);
      this.newTask = '';
    } catch (error) {
      console.error('There was an error creating the task:', error);
    }
  }
},
async removeTask(index) {
  const taskId = this.tasks[index].id;
  try {
    await this.$axios.delete(`/api/v1/tasks/${taskId}`);
    this.tasks.splice(index, 1);
  } catch (error) {
    console.error('There was an error deleting the task:', error);
  }
},


    startEditing(index) {
      this.editedIndex = index;
      this.editedItem = Object.assign({}, this.tasks[index]);
      this.dialog = true;
    },
    async saveEdit() {
  const taskId = this.editedItem.id;
  try {
    const taskData = { task: this.editedItem.task }; 
          // const taskData = { text: this.editedItem.text };

    const response = await this.$axios.put(`/api/v1/tasks/${taskId}`, taskData);
    if (this.editedIndex > -1) {
      this.tasks.splice(this.editedIndex, 1, response.data);
    } else {
      this.tasks.push(response.data);
    }
    this.closeDialog();
  } catch (error) {
    console.error('There was an error updating the task:', error);
  }
},
    closeDialog() {
      this.dialog = false;
      this.editedItem = { text: '' };
      this.editedIndex = -1;
    },
  }
};
</script>

  
<style scoped>

.v-card {
  margin-top: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.v-text-field {
  margin-bottom: 20px;
}

.v-btn {
  margin-right: 10px;
}

.v-list-item {
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: #f5f5f5; 
}

.v-list-item-action .v-btn {
  color: red; 
}
</style>


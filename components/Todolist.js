import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useStore from "./Store";

const ToDoList = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useStore();
  const [todo, setTodo] = useState({
    todo: "",
    name: "",
    schoolId: "",
    sectionCode: "",
    courseDescription: "",
    courseName: "",
    academicYear: "",
    idPicture: "",
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (name, value) => {
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitTodo = () => {
    if (!todo.todo.trim()) {
      // Prevent adding empty todos
      return;
    }
    if (editId) {
      editTodo({
        ...todo,
        id: editId,
      });
      setEditId(null);
    } else {
      addTodo({
        ...todo,
        id: Date.now().toString(), // Using timestamp as unique id
      });
    }
    clearForm();
  };

  const clearForm = () => {
    setTodo({
      todo: "",
      name: "",
      schoolId: "",
      sectionCode: "",
      courseDescription: "",
      courseName: "",
      academicYear: "",
      idPicture: "",
    });
  };

  const handleEdit = (item) => {
    setTodo(item);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task"
        placeholderTextColor="#999999"
        value={todo.todo}
        onChangeText={(text) => handleInputChange("todo", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999999"
        value={todo.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="School ID"
        placeholderTextColor="#999999"
        value={todo.schoolId}
        onChangeText={(text) => handleInputChange("schoolId", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Section Code"
        placeholderTextColor="#999999"
        value={todo.sectionCode}
        onChangeText={(text) => handleInputChange("sectionCode", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Description"
        placeholderTextColor="#999999"
        value={todo.courseDescription}
        onChangeText={(text) => handleInputChange("courseDescription", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        placeholderTextColor="#999999"
        value={todo.courseName}
        onChangeText={(text) => handleInputChange("courseName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Academic Year"
        placeholderTextColor="#999999"
        value={todo.academicYear}
        onChangeText={(text) => handleInputChange("academicYear", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Picture URL"
        placeholderTextColor="#999999"
        value={todo.idPicture}
        onChangeText={(text) => handleInputChange("idPicture", text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#a20021" }]}
        onPress={submitTodo}
      >
        <Text style={styles.buttonText}>{editId ? "Update" : "Add"}</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.idPicture }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text> {item.todo} </Text>
            <Text> {item.name} </Text>
            <Text> {item.schoolId} </Text>
            <Text> {item.sectionCode} </Text>
            <Text> {item.courseDescription} </Text>
            <Text> {item.courseName} </Text>
            <Text> {item.academicYear} </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#a20021" }]}
              title="Edit"
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#a20021" }]}
              title="Delete"
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.buttonText}>Done ✔</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0e6ef",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#a20021",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#efc3e6",
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    marginBottom: 5,
  },
});

export default ToDoList;

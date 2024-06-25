import MockAdapter from "axios-mock-adapter";
import axios from 'axios';
import TodoList from "./TodoList";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mock = new MockAdapter(axios);

beforeEach(() => {
    mock.reset();
})

test('renders TodoList and loads initial todos', async () => {
    const todos = [{id: 1, title: 'Test Todo'}];
    mock.onGet('http://localhost:5000/todos').reply(200, todos);

    const {getByText} = render(<TodoList />)

    await waitFor(() => expect(getByText("Test Todo")).toBeInTheDocument());
})

test('adds a new todo', async () => {
    const todos = [{id: 1, title: 'Test Todo'}];
    mock.onGet('http://localhost:5000/todos').reply(200, todos);
    mock.onPost('http://localhost:5000/todos').reply(201, {id: 2, title: 'New Todo'});

    const { getByText, getByRole } = render(<TodoList />);

    userEvent.type(getByRole('textbox', "New Todo"));
    userEvent.click(getByText('Add Todo'));

    await waitFor(() => expect(getByText("New Todo")).toBeInTheDocument());
})

test('deletes a todo', async () => {
    const todos = [{id: 1, title: 'Test Todo'}];
    mock.onGet('http://localhost:5000/todos').reply(200, todos);
    mock.onDelete('http://localhost:5000/todos/1').reply(200);

    const { getByText, queryByText } = render(<TodoList />);

    await waitFor(() => expect(getByText('Test Todo')).toBeInTheDocument());

    userEvent.click(getByText("Delete"));

    await waitFor(() => expect(queryByText('Test Todo')).not.toBeInTheDocument());
})
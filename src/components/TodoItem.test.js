import { render } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";

test('renders TodoItem and handles delete', () => {
    const todo = { id: 1, title: "Test Todo" };
    const handleDelete = jest.fn();
    const { getByText } = render(<TodoItem todo={todo} onDelete={handleDelete} />);
    expect(getByText('Test Todo')).toBeInTheDocument();
    userEvent.click(getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledWith(1);
})
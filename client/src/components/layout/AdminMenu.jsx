import { Link } from "react-router-dom";
import { List, ListItem, Card } from "@material-tailwind/react";

const AdminMenu = () => {
  return (
    <div>
      
      <Card className="w-96">
        <List>
          <Link to={'/dashboard/admin/users'} className="text-initial">
            <ListItem>Users</ListItem>
          </Link>
          <Link to={'/dashboard/admin/products'} className="text-initial">
            <ListItem>Products</ListItem>
          </Link>
          <Link to={'/dashboard/admin/create-category'} className="text-initial">
            <ListItem>Create Category</ListItem>
          </Link>
          <Link to={'/dashboard/admin/create-product'} className="text-initial">
            <ListItem>Create Product</ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
};

export default AdminMenu;

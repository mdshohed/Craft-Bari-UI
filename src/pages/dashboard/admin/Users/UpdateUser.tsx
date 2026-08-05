import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Select, Input } from 'antd';
import { TUser } from '../../../../types/user';


const { Option } = Select;

interface UserFormProps {
  user: TUser;
  onSubmit: (data: TUser) => void;
}

const UpdateUser: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  
  const { register, handleSubmit, setValue } = useForm<TUser>({
    defaultValues: user,
  });

  // Set values for controlled components
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("address", user.address);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const handleFormSubmit: SubmitHandler<TUser> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Name</label>
        <Input {...register("name")} placeholder="Enter name" />
      </div>

      <div>
        <label>Email</label>
        <Input {...register("email")} placeholder="Enter email" />
      </div>

      <div>
        <label>Phone</label>
        <Input {...register("phone")} placeholder="Enter phone number" />
      </div>

      <div>
        <label>Address</label>
        <Input {...register("address")} placeholder="Enter address" />
      </div>

      <div>
        <label>Role</label>
        <Select
          {...register("role")}
          defaultValue={user.role}
          onChange={(value) => setValue('role', value)}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
          <Option value="moderator">Moderator</Option>
        </Select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" htmlType="submit">Update User</Button>
      </div>
    </form>
  );
};

export default UpdateUser;

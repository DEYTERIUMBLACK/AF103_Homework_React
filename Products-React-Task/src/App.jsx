import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Button,
  ButtonGroup,
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Text,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

function App() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceOrder, setPriceOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDiscount, setEditedDiscount] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDiscount, setNewProductDiscount] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerIsAdmin, setRegisterIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserDeleteModalOpen, setUserDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://6555d0b184b36e3a431e63fd.mockapi.io/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://6555d0b184b36e3a431e63fd.mockapi.io/users/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }

    setUserDeleteModalOpen(false);
  };

  const handleChangeAdminStatus = async (userId, isAdmin) => {
    try {
      await axios.put(`https://6555d0b184b36e3a431e63fd.mockapi.io/users/${userId}`, {
        isAdmin: !isAdmin,
      });

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, isAdmin: !isAdmin } : user
      );

      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error changing admin status:', error);
    }
  };

  const handleOpenUserDeleteModal = (user) => {
    setSelectedUser(user);
    setUserDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://6555d0b184b36e3a431e63fd.mockapi.io/products'
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedIn(true);
      setLoggedInUser(storedUser);
      setAdmin(storedUser.isAdmin);
    }
  }, []);

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return priceOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setProducts(sortedProducts);
    setPriceOrder(priceOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://6555d0b184b36e3a431e63fd.mockapi.io/products/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedDiscount(product.discountPercentage);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { id } = selectedProduct;

    try {
      await axios.put(`https://6555d0b184b36e3a431e63fd.mockapi.io/products/${id}`, {
        name: editedName,
        price: editedPrice,
        discountPercentage: editedDiscount,
      });

      const updatedProducts = products.map((product) =>
        product.id === id
          ? { ...product, name: editedName, price: editedPrice, discountPercentage: editedDiscount }
          : product
      );

      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error editing product:', error);
    }

    setEditModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleSaveNewProduct = async () => {
    try {
      const response = await axios.post('https://6555d0b184b36e3a431e63fd.mockapi.io/products', {
        name: newProductName,
        price: newProductPrice,
        discountPercentage: newProductDiscount,
      });

      const newProduct = response.data;
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error('Error adding new product:', error);
    }

    setAddModalOpen(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDiscount('');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://6555d0b184b36e3a431e63fd.mockapi.io/users', {
        params: {
          username: loginUsername,
          password: loginPassword,
        },
      });

      const [user] = response.data;

      if (user) {
        setLoggedIn(true);
        setLoggedInUser(user);
        setAdmin(user.isAdmin);

        if (rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        }
      } else {
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }

    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdmin(false);
    setLoggedInUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://6555d0b184b36e3a431e63fd.mockapi.io/users', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        isAdmin: registerIsAdmin,
      });

      const newUser = response.data;
      console.log('User registered successfully:', newUser);
    } catch (error) {
      console.error('Error registering user:', error);
    }

    setRegisterModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

 return (
    <ChakraProvider>
      
     <div style={{ padding: '16px' }}>
        <div style={{ textAlign: 'center', fontSize: '2xl', marginBottom: '16px' }}>
          {isLoggedIn ? (
            <div>
              <Text>Hello, {loggedInUser.username}</Text>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div>
              <Button onClick={() => setLoginModalOpen(true)}>Login</Button>
              <Button onClick={handleOpenRegisterModal}>Register</Button>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <>
            {isAdmin ? ( // Admin user view
              <>
                 <Input
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearch}
                  mb={['2', '2', '4']}
                />
                  <ButtonGroup mb={['2', '2', '4']}>
                  <Button colorScheme="blue" onClick={handleSort}>
                    Sort {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}
                  </Button>
                  <Button colorScheme="purple" onClick={handleOpenAddModal}>
                    Add New Product
                  </Button>
                  <Button colorScheme="green" onClick={handleSortByPrice}>
                    Sort Price {priceOrder === 'asc' ? 'Min to Max' : 'Max to Min'}
                  </Button>
                </ButtonGroup>
                <Table variant="simple" size={['sm', 'md', 'lg']}>
                  <Tbody>
                    {filteredProducts.map((product) => (
                      <Tr key={product.id}>
                        <Td>{product.id}</Td>
                        <Td>{product.name}</Td>
                        <Td>{(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</Td>
                        <Td>
                          <Button colorScheme="blue" onClick={() => handleEdit(product)}>
                            Edit
                          </Button>
                        </Td>
                        <Td>
                          <Button colorScheme="red" onClick={() => handleDelete(product.id)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Input placeholder="Search users" mb={['2', '2', '4']} />
                <Table variant="simple" size={['sm', 'md', 'lg']}>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          <Checkbox
                            isChecked={user.isAdmin}
                            onChange={() => handleChangeAdminStatus(user.id, user.isAdmin)}
                          >
                            Admin
                          </Checkbox>
                        </Td>
                        <Td>
                          <Button colorScheme="red" onClick={() => handleOpenUserDeleteModal(user)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                {/* Delete User Modal */}
                <Modal isOpen={isUserDeleteModalOpen} onClose={() => setUserDeleteModalOpen(false)}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>Are you sure you want to delete the user?</Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="red" onClick={() => handleDeleteUser(selectedUser.id)}>
                        Delete
                      </Button>
                      <Button onClick={() => setUserDeleteModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
  {/* Add Modal */}
              <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add New Product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      placeholder="Product Name"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Product Price"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Product Discount"
                      value={newProductDiscount}
                      onChange={(e) => setNewProductDiscount(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="green" onClick={handleSaveNewProduct}>
                      Save
                    </Button>
                    <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Edit Modal */}
              <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      placeholder="Product Name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Product Price"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Product Discount"
                      value={editedDiscount}
                      onChange={(e) => setEditedDiscount(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> 
                            </>
            ) : ( // Non-admin user view
              <>
                <Input placeholder="Search by name" value={searchTerm} onChange={handleSearch} mb="4" />
                <ButtonGroup mb="4">
                  <Button colorScheme="blue" onClick={handleSort}>
                    Sort {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}
                  </Button>
                  <Button colorScheme="green" onClick={handleSortByPrice}>
                    Sort Price {priceOrder === 'asc' ? 'Min to Max' : 'Max to Min'}
                  </Button>
                </ButtonGroup>
                <Table variant="simple" size={['sm', 'md', 'lg']}>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            )}
          </>
        ) : (
          <Text fontSize={['lg', 'xl', '2xl']} mt={['2', '4']}>
          Please login to see products.
        </Text>
        )}

        {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Username or Email"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Remember Me
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={() => setLoginModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <Checkbox
              isChecked={registerIsAdmin}
              onChange={(e) => setRegisterIsAdmin(e.target.checked)}
            >
              Is Admin
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
            <Button onClick={() => setRegisterModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </ChakraProvider>
  );
}

export default App;

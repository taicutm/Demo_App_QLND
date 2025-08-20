import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'

import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface User {
  id: number
  name: string
  email: string
  active: boolean
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  // lấy api từ env
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // Lấy danh sách người dùng
  const fetchUsers = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data)
        else if (Array.isArray(data?.users)) setUsers(data.users)
        else setUsers([])
      })
      .catch(() => setUsers([]))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // State cho form thêm mới
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // State cho form chỉnh sửa
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editActive, setEditActive] = useState(false)

  // Thêm người dùng mới
  const handleAddUser = async () => {
    if (!name || !email) {
      toast.warn('Vui lòng nhập đủ thông tin!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      return
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/
    if (!emailRegex.test(email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập đúng định dạng!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      return
    }
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    if (res.ok) {
      toast.success('Thêm người dùng thành công!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      setName('')
      setEmail('')
      fetchUsers()
    } else {
      toast.error('Thêm thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
    }
  }

  // Xóa người dùng
  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return
    const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Xóa người dùng thành công!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      fetchUsers()
    } else {
      toast.error('Xóa thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
    }
  }

  // Bắt đầu chỉnh sửa: set giá trị vào form edit
  const handleEditUser = (id: number) => {
    const user = users.find((u) => u.id === id)
    if (user) {
      setEditId(id)
      setEditName(user.name)
      setEditEmail(user.email)
      setEditActive(!!user.active)
    }
  }

  // Lưu chỉnh sửa
  const handleSaveEdit = async () => {
    if (!editName || !editEmail) {
      toast.warn('Vui lòng nhập đủ thông tin!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      return
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/
    if (!emailRegex.test(editEmail)) {
      toast.error('Email không hợp lệ. Vui lòng nhập đúng định dạng!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      return
    }
    const res = await fetch(`${API_URL}/users/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
        active: editActive,
      }),
    })
    if (res.ok) {
      toast.success('Cập nhật thành công!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
      setEditId(null)
      setEditName('')
      setEditEmail('')
      setEditActive(false)
      fetchUsers()
    } else {
      toast.error('Cập nhật thất bại!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      })
    }
  }

  // Hủy chỉnh sửa
  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditId(null)
    setEditName('')
    setEditEmail('')
    setEditActive(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #a7bfe8 100%)',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 650,
          width: '100%',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          padding: 32,
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontSize: 36,
            fontWeight: 800,
            color: '#1976d2',
            letterSpacing: 1,
            marginBottom: 32,
            textShadow: '0 2px 8px #b0c4de44',
          }}
        >
          Quản lý người dùng
        </h1>
        <div
          style={{
            marginBottom: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <input
            type="text"
            placeholder="Tên người dùng"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              fontSize: 17,
              border: '1.5px solid #b0c4de',
              borderRadius: 8,
              outline: 'none',
              background: '#f4f8fb',
              transition: 'border 0.2s',
              boxShadow: '0 1px 4px #e3eafc44',
            }}
            onFocus={(e) => (e.target.style.border = '1.5px solid #1976d2')}
            onBlur={(e) => (e.target.style.border = '1.5px solid #b0c4de')}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              fontSize: 17,
              border: '1.5px solid #b0c4de',
              borderRadius: 8,
              outline: 'none',
              background: '#f4f8fb',
              transition: 'border 0.2s',
              boxShadow: '0 1px 4px #e3eafc44',
            }}
            onFocus={(e) => (e.target.style.border = '1.5px solid #1976d2')}
            onBlur={(e) => (e.target.style.border = '1.5px solid #b0c4de')}
          />
          <button
            onClick={handleAddUser}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
              color: '#fff',
              padding: 14,
              fontSize: 18,
              fontWeight: 700,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #b0c4de44',
              letterSpacing: 1,
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)')
            }
          >
            THÊM NGƯỜI DÙNG
          </button>
        </div>
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            background: '#f8fafc',
            borderRadius: 12,
            boxShadow: '0 2px 12px #b0c4de33',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '2px solid #b0c4de',
                background: '#e3eafc',
              }}
            >
              <th
                style={{
                  textAlign: 'left',
                  padding: 12,
                  fontSize: 17,
                  color: '#1976d2',
                }}
              >
                Tên
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: 12,
                  fontSize: 17,
                  color: '#1976d2',
                }}
              >
                Email
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: 12,
                  fontSize: 17,
                  color: '#1976d2',
                }}
              >
                Hoạt động
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: 12,
                  fontSize: 17,
                  color: '#1976d2',
                }}
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {editId === user.id ? (
                  <>
                    <td style={{ padding: 12 }}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: 6,
                          borderRadius: 6,
                          border: '1px solid #b0c4de',
                        }}
                      />
                    </td>
                    <td style={{ padding: 12 }}>
                      <input
                        type="text"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: 6,
                          borderRadius: 6,
                          border: '1px solid #b0c4de',
                        }}
                      />
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={editActive}
                        onChange={(e) => setEditActive(e.target.checked)}
                      />
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <button
                        onClick={handleSaveEdit}
                        style={{ color: '#388e3c', marginRight: 8 }}
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{ color: '#d32f2f' }}
                      >
                        Hủy
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: 12 }}>{user.name}</td>
                    <td style={{ padding: 12 }}>{user.email}</td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <input type="checkbox" checked={!!user.active} readOnly />
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1976d2',
                          cursor: 'pointer',
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#d32f2f',
                          cursor: 'pointer',
                          marginLeft: 12,
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}

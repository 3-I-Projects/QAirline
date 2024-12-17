from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        print('User:' + str(request.user))
        print('Is staff: ' + str(request.user.is_staff))
        return bool(request.user and request.user.is_staff)
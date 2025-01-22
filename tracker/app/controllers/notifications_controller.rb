class NotificationsController < ApplicationController
    before_action :authenticate_user!

    def create
        @notification = Notification.new(notification_params)
        if params[:task_id].present?
          @notification.task = Task.find(params[:task_id])
        end
        if @notification.save
          render json: @notification, status: :created
        else
          render json: { errors: @notification.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def index
      @notifications = current_user.notifications.order(created_at: :desc)
      render json: @notifications
    end
  
    def mark_as_read
      @notification = current_user.notifications.find(params[:id])
      @notification.update(read: true)
      head :ok
    end

    def mark_all_as_read
      @notifications = current_user.notifications
      @notifications.update_all(read: true)
      head :ok
    end

    def destroy
      @notification = current_user.notifications.find(params[:id])
      @notification.destroy
      head :no_content
    end

    def destroy_all
      current_user.notifications.destroy_all
      head :no_content
    end

    private

    def notification_params
        params.require(:notification).permit(:user_id, :message, :read, :link, :task_id)
    end
end
  
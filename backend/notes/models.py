from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.
class Notes(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notes"
    )

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = "Notes"

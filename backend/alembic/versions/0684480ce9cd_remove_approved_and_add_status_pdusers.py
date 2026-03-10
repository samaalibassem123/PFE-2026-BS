from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa


revision: str = '0684480ce9cd'
down_revision: Union[str, Sequence[str], None] = '6bc633914513'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


status_enum = sa.Enum(
    'PENDING',
    'APPROVED',
    'DECLINED',
    name='pendingusersstatus'
)


def upgrade() -> None:
    # create enum type first
    status_enum.create(op.get_bind(), checkfirst=True)

    # add column
    op.add_column(
        'pending_users',
        sa.Column(
            'status',
            status_enum,
            nullable=False,
            server_default='PENDING'
        )
    )

    op.drop_index(op.f('ix_pending_users_id'), table_name='pending_users')
    op.create_index(op.f('ix_pending_users_id'), 'pending_users', ['id'], unique=False)

    op.drop_column('pending_users', 'approved')


def downgrade() -> None:
    op.add_column(
        'pending_users',
        sa.Column('approved', sa.BOOLEAN(), nullable=False)
    )

    op.drop_index(op.f('ix_pending_users_id'), table_name='pending_users')
    op.create_index(op.f('ix_pending_users_id'), 'pending_users', ['id'], unique=True)

    op.drop_column('pending_users', 'status')

    # drop enum type
    status_enum.drop(op.get_bind(), checkfirst=True)